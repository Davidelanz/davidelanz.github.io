import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";

export const metadata: Metadata = {
  title: "Creating the Best Prototyping Workspace",
  description: "A Docker-based Jupyter and Conda setup for fast Python prototyping.",
  other: { date: "2021-06-05", tags: ["Docker", "Jupyter", "Conda", "Python"] },
};

export default function Page() {
  return (
    <ArticlePage
      title={metadata.title as string}
      description={metadata.description as string}
      date={metadata.other?.date as string}
      tags={metadata.other?.tags as string[]}
    >
      <>
        <p>
          <a href="https://github.com/Davidelanz/jupyter-docker">
            <img
              src="https://img.shields.io/badge/GutHub-Davidelanz%2Fjupyter--docker-white"
              alt=""
            />
          </a>
          <a href="https://hub.docker.com/r/davidelanz/jupyter">
            <img src="https://img.shields.io/badge/DockerHub-Davidelanz%2Fjupyter-blue" alt="" />
          </a>
        </p>
        <h2 id="contents"> Contents </h2>
        <ul>
          <li>
            <a href="#introduction">Introduction</a>
          </li>
          <li>
            <a href="#mount-the-image-from-dockerhub">Mount the image from DockerHub</a>
          </li>
          <li>
            <a href="#build-from-github">Build from GitHub</a>
          </li>
          <li>
            <a href="#manage-conda-environments">Manage Conda environments</a>
          </li>
        </ul>
        <h2>Introduction</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          <a href="https://docs.conda.io/en/latest/">Conda</a> and{" "}
          <a href="https://jupyter.org/">Jupyter Lab</a> are probably the best combination for
          easily manage packages and test code snippets while prototyping, especially in Machine and
          Deep Learning fields. For instance, some models could require{" "}
          <a href="https://www.tensorflow.org/versions/r1.15/api_docs/python/tf">Tensorflow 1.15</a>
          , others{" "}
          <a href="https://www.tensorflow.org/versions/r2.0/api_docs/python/tf">Tensorflow 2.0</a>,
          older ones <a href="https://caffe2.ai/">Caffe2</a>, or some other framework, and with such
          a setup, you can easily switch environments and python versions with a simple click.
        </p>
        <p>
          Since I am working a lot with <a href="https://www.docker.com/">Docker</a> on remote
          servers, I need also a ready-to-use Docker image. Hence, I built an image integrating
          Jupyter, Conda, and some little tools which I think could provide the “best prototyping
          workspace” with a very low effort. Indeed, the{" "}
          <a href="https://hub.docker.com/r/davidelanz/jupyter">davidelanz/jupyter</a> docker image
          provides a quick, dockerized setup for Jupyter Lab with multiple Conda environments.
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="https://jupyterlab-code-formatter.readthedocs.io/">
                  <img
                    src="https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/formatter.png"
                    alt=""
                  />
                </a>
              </td>
              <td>
                The image comes with{" "}
                <a href="https://jupyterlab-code-formatter.readthedocs.io/">
                  jupyterlab_code_formatter
                </a>{" "}
                already installed
              </td>
            </tr>
            <tr>
              <td>
                <a href="https://jupyterlab-lsp.readthedocs.io/en/latest/index.html">
                  <img
                    src="https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/lsp-integration.png"
                    alt=""
                  />
                </a>
              </td>
              <td>
                The image comes with{" "}
                <a href="https://jupyterlab-lsp.readthedocs.io/en/latest/index.html">
                  LSP Python language server for JupyterLab
                </a>{" "}
                (jedi 0.17.2) already installed
              </td>
            </tr>
            <tr>
              <td>
                <a href="https://opencv.org/">
                  <img
                    src="https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/opencv.png"
                    alt=""
                  />
                </a>
              </td>
              <td>
                The image comes already with a Python3.7 Conda environment with OpenCV support
                called <code>opencv-py3.7</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <img
            src="https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/banner.png"
            alt=""
          />
        </p>
        <h2>Mount the image from DockerHub</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Download the image from{" "}
          <a href="https://hub.docker.com/r/davidelanz/jupyter">davidelanz/jupyter</a>, then mount
          the container (the image exposes JupyterLab on the <code>8888</code> port):
        </p>
        <pre>
          <code>
            docker pull davidelanz/jupyter docker run \ -p &lt;CONTANER_PORT&gt;:8888 \ -v
            &lt;EXTERNAL_FOLDER&gt;:/workspace \ --name &lt;CONTAINER_NAME&gt; davidelanz/jupyter
          </code>
        </pre>
        <p>
          Your workspace will be available at <code>http://localhost:&lt;CONTANER_PORT&gt;</code>.
        </p>
        <h2>Build from GitHub</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>The image can be directly built from the GitHub repository:</p>
        <pre>
          <code>
            $ git clone https://github.com/davidelanz/jupyter-docker $ cd jupyter-docker/ $ docker
            build . -t davidelanz/jupyter
          </code>
        </pre>
        <h2>Manage Conda environments</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <blockquote>
          <p>
            The image comes already with a Python3.7 environment with OpenCV support called{" "}
            <code>opencv-py3.7</code>.
          </p>
        </blockquote>
        <p>
          You can create a new environment as follows (you can easily do it from the JupyterLab
          console):
        </p>
        <pre>
          <code>
            conda create -y --name &lt;DESIRED_ENV_NAME&gt; python=&lt;DESIRED_PYTHON_VERSION&gt;
          </code>
        </pre>
        <p>Then you can load it to JupyterLab as follows:</p>
        <pre>
          <code>
            conda activate &lt;DESIRED_ENV_NAME&gt; &amp;&amp; \ conda install -y ipykernel
            &amp;&amp; \ python -m ipykernel install --name &lt;DESIRED_ENV_NAME&gt; --user
          </code>
        </pre>
        <p>With Jupyter installed you get the list of currently installed kernels with:</p>
        <pre>
          <code>jupyter kernelspec list</code>
        </pre>
        <p>If you want to uninstall an unwanted kernel:</p>
        <pre>
          <code>jupyter kernelspec uninstall &lt;UNWANTED_KERNEL&gt;</code>
        </pre>
      </>
    </ArticlePage>
  );
}
