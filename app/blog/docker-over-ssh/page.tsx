import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { definePostMetadata } from "../post-metadata";

export const metadata: Metadata = definePostMetadata({
  title: "Connect to a Docker Container on a Remote Server over SSH",
  description:
    "Enable SSH tunneling from a remote Docker container and connect directly with VS Code.",
  date: "2021-06-10",
  tags: ["Docker", "VSCode"],
});

export default function Page() {
  return (
    <ArticlePage
      title={metadata.title as string}
      description={metadata.description as string}
      date={metadata.other?.date as string}
      tags={metadata.other?.tags as string[]}
    >
      <>
        <h2 id="contents"> Contents </h2>
        <ul>
          <li>
            <a href="#the-problem">The problem</a>
          </li>
          <li>
            <a href="#mounting-a-docker-container">Mounting a Docker container</a>
          </li>
          <li>
            <a href="#mounting-a-docker-container-with-ssh-enabled">
              Mounting a Docker Container with SSH enabled
            </a>
          </li>
          <li>
            <a href="#connect-via-command-line">Connect via command line</a>
          </li>
          <li>
            <a href="#connect-via-vscode">Connect via VSCode</a>
          </li>
        </ul>
        <h2>The problem</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          I work extensively with machine learning and deep learning algorithms written in Python.
          Because of the various frameworks available (such as{" "}
          <a href="https://pytorch.org/">PyTorch</a>,
          <a href="https://www.tensorflow.org/">TensorFlow</a>,
          <a href="https://rapids.ai/">RAPIDS</a>,
          <a href="http://epistasislab.github.io/tpot/">TPOT</a> …) I use
          <a href="https://www.docker.com/">Docker</a> a lot, usually along with a{" "}
          <strong>Jupyter-enabled image</strong> (see{" "}
          <a href="/blog/creating-the-best-prototyping-workspace">my other article</a> if you are
          interested) which allows me to do all the prototyping I need in a fast and clean way. It
          is common to put such containers on a remote server with the required hardware (mostly
          GPUs) rather than developing on the local machine.
        </p>
        <p>
          Sometimes, though, JupyterLab is not enough, and some good old
          <a href="https://code.visualstudio.com/">VSCode</a>
          coding is the best thing I can hope for, especially when dealing with{" "}
          <strong>Python package development</strong>, which I will then have to test with Jupyter.
          And here we encounter our problem:
        </p>
        <blockquote>
          <p>
            VS Code does not allow you to connect to a remote container on a remote server. It only
            allows you to connect to a remote machine or to local containers. If we attach VS Code
            to our remote server:
            <img
              alt="VSCode Attach via SHH"
              src="/assets/images/posts/2020-06-10-docker-over-ssh/VSCodeSSH.jpg"
              width="400"
            />
            and then try to attach VS Code to a running container on the remote server:
            <img
              alt="VSCode Attach via Docker"
              src="/assets/images/posts/2020-06-10-docker-over-ssh/VSCodeDocker.jpg"
              width="600"
            />
            we get the following error:
            <img
              alt="VSCode Error"
              src="/assets/images/posts/2020-06-10-docker-over-ssh/VSCodeError.jpg"
              width="400"
            />
          </p>
        </blockquote>
        <p>
          The best solution, in this case, is to enable SSH tunneling directly from the Docker
          container, allowing VS Code to connect seamlessly to the container as if it were a
          standalone remote machine:
        </p>
        <div className="row justify-content-center mx-auto mb-4">
          <div className="col-md-9">
            <object
              type="image/svg+xml"
              className="w-100"
              data="/assets/images/posts/2020-06-10-docker-over-ssh/SSHTunnel.svg"
            >
              SSH Tunnel
            </object>
          </div>
        </div>
        <h2>Mounting a Docker container</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Let’s use the{" "}
          <a href="/blog/creating-the-best-prototyping-workspace">Jupyter-enabled image</a> we
          mentioned earlier as the base image for our container. After pulling it from{" "}
          <a href="https://hub.docker.com/r/davidelanz/jupyter">Docker Hub</a>:
        </p>
        <pre>
          <code>{`docker pull davidelanz/jupyter`}</code>
        </pre>
        <p>
          we can mount it exposing the container’s Jupyter port <code>8888</code> on, for example,{" "}
          <code>my.server.local:2345</code> using the option{" "}
          <code>--publish &lt;SERVER-PORT&gt;:&lt;CONTAINER_PORT&gt;</code> (or <code>-p</code>),
          which publishes a container’s port (<code>8888</code>) to the specified server port (
          <code>2345</code>):
        </p>
        <pre>
          <code>{`docker run\\
    -p 2345:8888 \\
    --name my-jupyter-workspace \\
    davidelanz/jupyter`}</code>
        </pre>
        <p>
          Now we can access Jupyter at <code>my.server.local:2345</code>, but can’t attach VSCode or
          connect via SSH to the <code>my-jupyter-workspace</code> container.
        </p>
        <h2>Mounting a Docker Container with SSH enabled</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          In order to enable the SSH tunnel, we first have to expose the container’s SSH port{" "}
          <code>22</code> to a server port. In our case, we will use{" "}
          <code>my.server.local:2344</code>:
        </p>
        <pre>
          <code>{`docker run\\
    -p 2344:22 \\
    -p 2345:8888 \\
    --name my-jupyter-workspace \\
    davidelanz/jupyter`}</code>
        </pre>
        <p>Now, we have to enter the container. First, we enter the server via SSH:</p>
        <pre>
          <code>{`ssh my.server.local`}</code>
        </pre>
        <p>Then, we attach to the container with:</p>
        <pre>
          <code>{`docker container exec -it my-jupyter-workspace /bin/bash`}</code>
        </pre>
        <p>
          Now we are finally inside our running container, and we can install an SSH server directly
          in it:
        </p>
        <pre>
          <code>{`apt-get update && \\
    apt-get upgrade -y && \\
    apt-get -y install openssh-server && \\
    mkdir -p /var/run/sshd && \\
    service ssh start`}</code>
        </pre>
        <blockquote>
          <p>
            If it has not already been set, we must change the root password to log in during the
            SSH authentication process:
          </p>
          <pre>
            <code>{`echo "root:<NEW_PASSWORD>"|chpasswd`}</code>
          </pre>
        </blockquote>
        <p>
          Now we are able to start the SSH server process via <code>service ssh restart</code>, but
          we still can’t log in. In fact, we have to{" "}
          <strong>authorize SSH connections with the root account</strong>. To do that, we need to
          go to <code>/etc/ssh/sshd_config</code> and modify the option
          <code>PermitRootLogin</code> from <code>prohibit-password</code> to <code>yes</code>.
          Moreover, if it is not commented, comment the <code>UsePam yes</code> line. We can open
          the text file with <a href="https://help.ubuntu.com/community/Nano">GNU nano</a>:
        </p>
        <pre>
          <code>{`apt-get install nano && nano /etc/ssh/sshd_config`}</code>
        </pre>
        <table>
          <thead>
            <tr>
              <th>Before</th>
              <th></th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code># PermitRootLogin prohibit-password</code>
              </td>
              <td>→</td>
              <td>
                <code>PermitRootLogin yes</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>UsePAM yes</code>
              </td>
              <td>→</td>
              <td>
                <code>#UsePAM yes</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Then we just need to restart the SSH process:</p>
        <pre>
          <code>{`service ssh restart`}</code>
        </pre>
        <h2>Connect via command line</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Now we can connect from the command line to port <code>2344</code> on the Docker server,
          using the remote server’s address (<code>my.address.local</code>) and specifying the SSH
          port with <code>-p &lt;port&gt;</code>:
        </p>
        <pre>
          <code>{`ssh -p 2344 my.address.local`}</code>
        </pre>
        <h2>Connect via VSCode</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          We can now add <code>my.address.local:2344</code> to the SSH configuration file:
        </p>
        <pre>
          <code>{`Host my-remote-container
  HostName my.address.local
  User root
  Port 2344
  ForwardAgent yes`}</code>
        </pre>
        <p>
          and we can use the VSCode{" "}
          <a href="https://code.visualstudio.com/docs/remote/ssh">Remote Explorer</a>
          tool to attach VSCode directly to the container running on the remote server.
        </p>
      </>
    </ArticlePage>
  );
}
