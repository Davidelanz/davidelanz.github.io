import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { definePostMetadata } from "../post-metadata";

export const metadata: Metadata = definePostMetadata({
  title: "Set Up a Neo4j Server with Docker and Import Huge CSV Datasets",
  description:
    "Use neo4j-admin through Docker to initialize a graph database from large CSV datasets.",
  date: "2021-07-03",
  tags: ["Graphs", "Neo4j", "Docker"],
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
        <p>
          From both a work and a research perspective, it is clear how fundamental graph data is:
          from disease detection, genetics, and healthcare to banking and engineering, graphs are
          emerging as a powerful analysis paradigm for hard problems.{" "}
          <a href="https://neo4j.com/">Neo4j</a> gives developers and data scientists the most
          trusted and advanced tools to quickly build today’s intelligent applications and machine
          learning workflows. And the great thing is that it is (
          <a href="https://neo4j.com/pricing/">almost</a>) free.
        </p>
        <p>
          Neo4j relies on the <a href="https://neo4j.com/developer/cypher/">Cypher</a> query
          language (<a href="http://opencypher.org/">open source</a>). Cypher allows users to store
          and retrieve data from the graph database. Cypher’s{" "}
          <a href="https://neo4j.com/docs/cypher-manual/current/clauses/load-csv/">
            <code>LOAD CSV</code>
          </a>{" "}
          is great for importing small datasets into our running database. Nevertheless, dealing
          with <strong>big data</strong> can be pretty tedious (if not ludicrously slow). To
          initialize an unused database with large amounts of data from CSV files we need to use the{" "}
          <a href="https://neo4j.com/docs/operations-manual/current/tools/neo4j-admin/">
            <code>neo4j-admin</code>
          </a>{" "}
          command.
        </p>
        <p>
          Neo4j Admin is the primary tool for managing your Neo4j instance. It is a command-line
          tool that is installed as part of the product and can be executed with several commands.
          Here, we show how to set up a Neo4j server via a Docker image on a local machine, first
          importing large datasets into a brand-new graph database and then running the server in a{" "}
          <a href="https://neo4j.com/pricing/">self-hosted</a> fashion. And again, all this for
          free.
        </p>
        <h2 id="contents"> Contents </h2>
        <ul>
          <li>
            <a href="#the-northwind-dataset">The NorthWind dataset</a>
          </li>
          <li>
            <a href="#prepare-your-csv-data">Prepare your CSV data</a>
          </li>
          <li>
            <a href="#the-neo4j-docker-image">The Neo4j Docker Image</a>
          </li>
          <li>
            <a href="#import-data">Import data</a>
          </li>
          <li>
            <a href="#launch-the-server">Launch the server</a>
          </li>
          <li>
            <a href="#upgrade-to-neo4j-enterprise--bloom">
              Upgrade to Neo4j Enterprise &amp; Bloom
            </a>
          </li>
        </ul>
        <h2>The NorthWind dataset</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Before loading our CSV data into our server, we have to convert it into a Neo4j-compliant
          fashion. Here, we will be using the{" "}
          <a href="https://github.com/neo4j-contrib/developer-resources/tree/gh-pages/data/northwind">
            NorthWind dataset
          </a>
          , a commonly used SQL dataset. This data depicts a product sales system—storing and
          tracking customers, products, customer orders, warehouse stock, shipping, suppliers, and
          even employees and their sales territories:
        </p>
        <div className="text-center">
          <img
            alt="Northwind dataset ER diagram"
            src="https://dist.neo4j.com/wp-content/uploads/Northwind_diagram.jpg"
            width={800}
          />
        </div>
        <p>
          Although the NorthWind dataset is often used to demonstrate SQL and relational databases,
          the data can also be structured as a graph:
        </p>
        <div className="text-center">
          <img
            alt="Northwind dataset graph diagram"
            src="https://dist.neo4j.com/wp-content/uploads/northwind_graph_simple.svg"
            width={700}
          />
        </div>
        <p>
          The main differences between the Graph Model and the Relational Model are the following:
        </p>
        <table>
          <thead>
            <tr>
              <th>Relational Model</th>
              <th>Graph Model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>null</code> values allowed
              </td>
              <td>
                No <code>null</code> value allowed
              </td>
            </tr>
            <tr>
              <td>
                Less detailed and clear (e.g. to model sales, we need an Orders-to-Employees foreign
                key relationship)
              </td>
              <td>More detailed and clear (e.g., we know that an employee SOLD an order)</td>
            </tr>
            <tr>
              <td>Faster for unconnected data</td>
              <td>Faster for connected data</td>
            </tr>
            <tr>
              <td>Query latency proportional to the amount of data stored (“join bomb”)</td>
              <td>
                Query latency proportional to how much of the graph you choose to explore in a query
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          We have the <code>orders.csv</code> file:
        </p>
        <table>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>CustomerID</th>
              <th>EmployeeID</th>
              <th>OrderDate</th>
              <th>RequiredDate</th>
              <th>ShippedDate</th>
              <th>ShipVia</th>
              <th>Freight</th>
              <th>ShipName</th>
              <th>ShipAddress</th>
              <th>ShipCity</th>
              <th>ShipRegion</th>
              <th>ShipPostalCode</th>
              <th>ShipCountry</th>
              <th>OrderID</th>
              <th>ProductID</th>
              <th>UnitPrice</th>
              <th>Quantity</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10248</td>
              <td>VINET</td>
              <td>5</td>
              <td>1996-07-04</td>
              <td>1996-08-01</td>
              <td>1996-07-16</td>
              <td>3</td>
              <td>32.38</td>
              <td>Vins et alcools Chevalier</td>
              <td>59 rue de l’Abbaye</td>
              <td>Reims</td>
              <td></td>
              <td>51100</td>
              <td>France</td>
              <td>10248</td>
              <td>11</td>
              <td>14</td>
              <td>12</td>
              <td>0</td>
            </tr>
            <tr>
              <td>10248</td>
              <td>VINET</td>
              <td>5</td>
              <td>1996-07-04</td>
              <td>1996-08-01</td>
              <td>1996-07-16</td>
              <td>3</td>
              <td>32.38</td>
              <td>Vins et alcools Chevalier</td>
              <td>59 rue de l’Abbaye</td>
              <td>Reims</td>
              <td></td>
              <td>51100</td>
              <td>France</td>
              <td>10248</td>
              <td>42</td>
              <td>9.8</td>
              <td>10</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <p>
          Then we have the <code>employees.csv</code> file:
        </p>
        <table>
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>LastName</th>
              <th>FirstName</th>
              <th>Title</th>
              <th>TitleOfCourtesy</th>
              <th>BirthDate</th>
              <th>HireDate</th>
              <th>Address</th>
              <th>City</th>
              <th>Region</th>
              <th>PostalCode</th>
              <th>Country</th>
              <th>HomePhone</th>
              <th>Extension</th>
              <th>Photo</th>
              <th>Notes</th>
              <th>ReportsTo</th>
              <th>PhotoPath</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Davolio</td>
              <td>Nancy</td>
              <td>Sales Representative</td>
              <td>Ms.</td>
              <td>1948-12-08</td>
              <td>1992-05-01</td>
              <td>507 - 20th Ave. E.\nApt. 2A</td>
              <td>Seattle</td>
              <td>WA</td>
              <td>98122</td>
              <td>USA</td>
              <td>(206) 555-9857</td>
              <td>5467</td>
              <td>\x</td>
              <td>“Education includes a BA in (…)”</td>
              <td>2</td>
              <td>
                <a href="http://accweb/emmployees/davolio.bmp">
                  http://accweb/emmployees/davolio.bmp
                </a>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Fuller</td>
              <td>Andrew</td>
              <td>“Vice President, Sales”</td>
              <td>Dr.</td>
              <td>1952-02-19</td>
              <td>1992-08-14</td>
              <td>908 W. Capital Way</td>
              <td>Tacoma</td>
              <td>WA</td>
              <td>98401</td>
              <td>USA</td>
              <td>(206) 555-9482</td>
              <td>3457</td>
              <td>\x</td>
              <td>“Andrew received his BTS commercial (…)”</td>
              <td></td>
              <td>
                <a href="http://accweb/emmployees/fuller.bmp">
                  http://accweb/emmployees/fuller.bmp
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          We will limit this example to just these two entities () and the relationship between
          them.
        </p>
        <h2>Prepare your CSV data</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          In order to import it into Neo4j, we have to prepare the headers in a Neo4j-compliant
          fashion. From the two CSV files, we will need three separate ones.
        </p>
        <p>
          We have the <code>orders_prepared.csv</code> file:
        </p>
        <table>
          <thead>
            <tr>
              <th>OrderID:ID</th>
              <th>OrderDate:DATE</th>
              <th>RequiredDate:DATE</th>
              <th>ShippedDate:DATE</th>
              <th>ShipVia:INTEGER</th>
              <th>Freight:FLOAT</th>
              <th>ShipName:STRING</th>
              <th>ShipAddress:STRING</th>
              <th>ShipCity:STRING</th>
              <th>ShipRegion:STRING</th>
              <th>ShipPostalCode:INTEGER</th>
              <th>ShipCountry:STRING</th>
              <th>UnitPrice:FLOAT</th>
              <th>Quantity:INTEGER</th>
              <th>Discount:FLOAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10248</td>
              <td>1996-07-04</td>
              <td>1996-08-01</td>
              <td>1996-07-16</td>
              <td>3</td>
              <td>32.38</td>
              <td>Vins et alcools Chevalier</td>
              <td>59 rue de l’Abbaye</td>
              <td>Reims</td>
              <td></td>
              <td>51100</td>
              <td>France</td>
              <td>14</td>
              <td>12</td>
              <td>0</td>
            </tr>
            <tr>
              <td>10248</td>
              <td>1996-07-04</td>
              <td>1996-08-01</td>
              <td>1996-07-16</td>
              <td>3</td>
              <td>32.38</td>
              <td>Vins et alcools Chevalier</td>
              <td>59 rue de l’Abbaye</td>
              <td>Reims</td>
              <td></td>
              <td>51100</td>
              <td>France</td>
              <td>9.8</td>
              <td>10</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <p>
          Then we have the <code>employees_prepared.csv</code> file:
        </p>
        <table>
          <thead>
            <tr>
              <th>EmployeeID:ID</th>
              <th>LastName:STRING</th>
              <th>FirstName:STRING</th>
              <th>Title:STRING</th>
              <th>TitleOfCourtesy:STRING</th>
              <th>BirthDate:DATE</th>
              <th>HireDate:DATE</th>
              <th>Address:STRING</th>
              <th>City:STRING</th>
              <th>Region:STRING</th>
              <th>PostalCode:INTEGER</th>
              <th>Country:STRING</th>
              <th>HomePhone:STRING</th>
              <th>Extension:IGNORE</th>
              <th>Photo:IGNORE</th>
              <th>Notes:IGNORE</th>
              <th>PhotoPath:IGNORE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Davolio</td>
              <td>Nancy</td>
              <td>Sales Representative</td>
              <td>Ms.</td>
              <td>1948-12-08</td>
              <td>1992-05-01</td>
              <td>507 - 20th Ave. E.\nApt. 2A</td>
              <td>Seattle</td>
              <td>WA</td>
              <td>98122</td>
              <td>USA</td>
              <td>(206) 555-9857</td>
              <td>5467</td>
              <td>\x</td>
              <td>“Education includes a BA in (…)”</td>
              <td>
                <a href="http://accweb/emmployees/davolio.bmp">
                  http://accweb/emmployees/davolio.bmp
                </a>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Fuller</td>
              <td>Andrew</td>
              <td>“Vice President, Sales”</td>
              <td>Dr.</td>
              <td>1952-02-19</td>
              <td>1992-08-14</td>
              <td>908 W. Capital Way</td>
              <td>Tacoma</td>
              <td>WA</td>
              <td>98401</td>
              <td>USA</td>
              <td>(206) 555-9482</td>
              <td>3457</td>
              <td>\x</td>
              <td>“Andrew received his BTS commercial (…)”</td>
              <td>
                <a href="http://accweb/emmployees/fuller.bmp">
                  http://accweb/emmployees/fuller.bmp
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Finally, we have the brand new <code>sold_prepared.csv</code> file:
        </p>
        <table>
          <thead>
            <tr>
              <th>:START_ID(Order)</th>
              <th>:START_ID(Employee)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10248</td>
              <td>1</td>
            </tr>
            <tr>
              <td>10248</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <p>
          What do these new headers mean? Briefly, the column names are used for property names of
          the nodes (<code>Order</code> and <code>Employee</code>) and relationship (
          <code>SOLD</code>) we want to create. There is specific markup on specific columns:
        </p>
        <ul>
          <li>
            <code>:ID</code> - global id column used to look up the node later reconnecting
            <ul>
              <li>
                if you have repeated IDs across entities, you have to provide the entity (id-group)
                in parentheses like <code>:ID(Order)</code>
              </li>
              <li>if your IDs are globally unique, you can leave that off</li>
            </ul>
          </li>
          <li>
            <code>:LABEL</code> - label column for nodes. Multiple labels can be separated by a
            delimiter
          </li>
          <li>
            <code>:START_ID</code>, <code>:END_ID</code> - relationship file columns referring to
            the node ids. For id-groups, use <code>:END_ID(Order)</code>
          </li>
          <li>
            <code>:TYPE</code> - column to specify relationship-type
          </li>
          <li>
            All other columns are treated as properties but skipped if empty or annotated with{" "}
            <code>:IGNORE</code>.
          </li>
          <li>
            Type conversion is possible by suffixing the name with type indicators like
            <ul>
              <li>
                <code>:INTEGER</code> and <code>:FLOAT</code> (subtypes of the abstract type{" "}
                <code>NUMBER</code>)
              </li>
              <li>
                <code>:STRING</code>
              </li>
              <li>
                <code>:BOOLEAN</code>
              </li>
              <li>
                The spatial type <code>:POINT</code>
              </li>
              <li>
                Temporal types: <code>:DATE</code>, <code>:TIME</code>, <code>:LOCALTIME</code>,{" "}
                <code>:DATETIME</code>, <code>:LOCALDATETIME</code> and <code>:DURATION</code>
              </li>
            </ul>
          </li>
        </ul>
        <blockquote>
          <p>Note - These are the timestamp formats for Cypher:</p>
          <pre>
            <code>{`RETURN DATE("2019-06-01")
RETURN TIME("18:40:32.142+0100")
RETURN DATETIME("2019-06-01T18:40:32.142+0100")`}</code>
          </pre>
        </blockquote>
        <h2>The Neo4j Docker Image</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Neo4j provides and maintains official{" "}
          <a href="https://hub.docker.com/_/neo4j/">Neo4j Docker images</a> on DockerHub for both
          Neo4j Community and Enterprise editions (we’re interested in the first one). There are
          several ways to leverage Docker for your Neo4j development and deployment. You can create
          throw-away Neo4j instances of many different versions for testing and running your
          applications. You can also pre-seed containers with datasets, extensions, and
          configurations for interaction and processing. Here, we want to perform two steps on our
          local machine:
        </p>
        <ol>
          <li>
            Import data into the default database, called <code>neo4j</code> (the only one provided
            by the Community edition) with an interactive run of the container executing{" "}
            <code>neo4j-admin import</code>, storing database files on persistent Docker volumes
          </li>
          <li>
            Launch the server in a detached run, exposing both the server and the web client on two
            ports of the local machine
          </li>
        </ol>
        <p>
          To download the image, we just need to execute <code>docker pull neo4j</code> with the
          desired tag:
        </p>
        <pre>
          <code>{`docker pull:4.3.1-community`}</code>
        </pre>
        <p>We will use three Docker persistent volumes:</p>
        <ul>
          <li>
            <code>neo4j-data</code> to store our database files
          </li>
          <li>
            <code>neo4j-import</code> to store our CSV files
          </li>
          <li>
            <code>neo4j-plugins</code> to store the{" "}
            <a href="https://neo4j.com/news/supercharge-neo4j-with-plugins/">plugins</a> we need
          </li>
        </ul>
        <h2>Import data</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          In your Docker volume folder <code>/neo4j-import/_data</code>, create a{" "}
          <code>csv_files</code> folder in which to store your data:
        </p>
        <pre>
          <code>{`neo4j-import/_data/
└── csv_files/
    ├── orders_prepared.csv
    ├── employees_prepared.csv
    └── sold_prepared.csv`}</code>
        </pre>
        <p>
          Then, import data into the default database with an interactive run of the container
          executing <code>neo4j-admin import</code>, storing database files on the docker volume{" "}
          <code>neo4j-data</code>:
        </p>
        <pre>
          <code>{`docker run --interactive --tty --rm \\
    --env=NEO4J_AUTH=neo4j/<YOUR_PASSWORD> \\
    --env=NEO4JLABS_PLUGINS='["apoc", "graph-data-science", "n10s"]' \\
    --volume=neo4j-data:/data \\
    --volume=neo4j-import:/var/lib/neo4j/import \\
    --volume=neo4j-plugins:/plugins \\
    --name=neo4j-server \\
    neo4j:4.3.1-community \\
bin/neo4j-admin import \\
--database=neo4j \\
--skip-bad-relationships \\
--nodes=Order=import/csv_files/orders_prepared.csv \\
--nodes=Employee=import/csv_files/employees_prepared.csv \\
--relationships=SOLD=import/csv_files/sold_prepared.csv \\`}</code>
        </pre>
        <p>What do all these parameters mean?</p>
        <ul>
          <li>
            <code>docker run</code> options:
            <ul>
              <li>
                <code>--interactive</code> keeps STDIN open even if not attached
              </li>
              <li>
                <code>--tty</code> allocates a{" "}
                <a href="https://en.wikipedia.org/wiki/Pseudoterminal">pseudo-TTY</a>
              </li>
              <li>
                <a href="https://docs.docker.com/engine/reference/run/#clean-up---rm">
                  <code>--rm</code>
                </a>{" "}
                makes Docker automatically clean up the container and remove the file system when
                the container exits (by default a container’s file system persists even after the
                container exits)
              </li>
              <li>
                <a href="https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file">
                  <code>--env</code>
                </a>{" "}
                sets an environment variable
              </li>
              <li>
                <a href="https://docs.docker.com/engine/reference/commandline/run/#mount-volumes-from-container---volumes-from">
                  <code>--volume</code>
                </a>{" "}
                mounts the volume at a certain location in the container
              </li>
              <li>
                <code>--name</code> gives a name to the container
              </li>
            </ul>
          </li>
          <li>
            environment variables:
            <ul>
              <li>
                <code>NEO4J_AUTH=neo4j/&lt;YOUR_PASSWORD&gt;</code> sets the password for admin{" "}
                <code>neo4j</code> to <code>&lt;YOUR_PASSWORD&gt;</code>
              </li>
              <li>
                <code>
                  NEO4JLABS_PLUGINS='[&quot;apoc&quot;, &quot;graph-data-science&quot;,
                  &quot;n10s&quot;]'
                </code>{" "}
                contains the plugins we want to install (these three are the most useful and they do
                not require a{" "}
                <a href="https://neo4j.com/labs/apoc/4.1/installation/">manual installation</a>)
              </li>
            </ul>
          </li>
          <li>
            <code>neo4j-import</code> options:
            <ul>
              <li>
                <code>--database=neo4j</code> sets the database where we will import our data (the
                default <code>neo4j</code> one in our case, since we are using the Community
                edition)
              </li>
              <li>
                <code>--skip-bad-relationships</code> allows silent removal of bad relationships,
                i.e., relationships that refer to missing node IDs, either for{" "}
                <code>:START_ID</code> or <code>:END_ID</code> (normally, any bad relationship is
                considered an error and will fail the import)
              </li>
              <li>
                <code>--nodes=Order=import/csv_files/orders_prepared.csv</code> specifies the file
                from which <code>Order</code> nodes are imported
              </li>
              <li>
                <code>--nodes=Employee=import/csv_files/employees_prepared.csv</code> specifies the
                file from which <code>Employee</code> nodes are imported
              </li>
              <li>
                <code>--relationships=SOLD=import/csv_files/sold_prepared.csv</code> specifies the
                file from which <code>SOLD</code> relationships are imported
              </li>
            </ul>
          </li>
        </ul>
        <h2>Launch the server</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Now we finally have our data imported into our Docker persistent volume{" "}
          <code>neo4j-data</code>. We can now start the container with the following command:
        </p>
        <pre>
          <code>{`docker run -d --restart always \\
    --env=NEO4J_AUTH=neo4j/<YOUR_PASSWORD> \\
    --env=NEO4JLABS_PLUGINS='["apoc","graph-data-science", "n10s"]' \\
    --env=NEO4J_dbms_connector_http_listen__address=:6476 \\
    --env=NEO4J_dbms_connector_https_listen__address=:6477 \\
    --env=NEO4J_dbms_connector_bolt_listen__address=:7687 \\
    --env=NEO4J_dbms_connector_http_advertised__address=:6476 \\
    --env=NEO4J_dbms_connector_https_advertised__address=:6477 \\
    --env=NEO4J_dbms_connector_bolt_advertised__address=:7687 \\
    --env=NEO4J_dbms_security_procedures_unrestricted=gds.*,apoc.* \\
    --env=NEO4J_dbms_security_procedures_allowlist=gds.*,apoc.* \\
    --publish=<HTTP_PORT>:6476 \\
    --publish=<HTTPS_PORT>:6477 \\
    --publish=<BOLT_PORT>:7687 \\
    --volume=neo4j-data:/data \\
    --volume=neo4j-import:/var/lib/neo4j/import \\
    --volume=neo4j-plugins:/plugins \\
    --name=neo4j-server \\
    neo4j:4.3.1-community `}</code>
        </pre>
        <p>What do all these parameters mean?</p>
        <ul>
          <li>
            <code>docker run</code> options:
            <ul>
              <li>
                <a href="https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose">
                  <code>--publish</code>
                </a>{" "}
                binds the “right” port of the container to the “left” TCP port of the host machine.
              </li>
            </ul>
          </li>
          <li>
            environment variables:
            <ul>
              <li>
                <code>NEO4J_AUTH=neo4j/&lt;YOUR_PASSWORD&gt;</code> sets the password for admin{" "}
                <code>neo4j</code> to <code>&lt;YOUR_PASSWORD&gt;</code>
              </li>
              <li>
                <code>
                  NEO4JLABS_PLUGINS='[&quot;apoc&quot;,&quot;graph-data-science&quot;,
                  &quot;n10s&quot;]'
                </code>{" "}
                specifies the plugins we want to use
              </li>
            </ul>
          </li>
          <li>
            <code>neo4j-import</code> options:
            <ul>
              <li>
                <code>NEO4J_dbms_connector_http_listen__address=:6476</code> and{" "}
                <code>NEO4J_dbms_connector_http_advertised__address=:6476</code> specify the HTTP
                listen port for incoming connections
              </li>
              <li>
                <code>NEO4J_dbms_connector_https_listen__address=:6477</code> and{" "}
                <code>NEO4J_dbms_connector_https_advertised__address=:6477</code> specify the HTTPS
                listen port for incoming connections
              </li>
              <li>
                <code>NEO4J_dbms_connector_bolt_listen__address=:7687</code> and{" "}
                <code>NEO4J_dbms_connector_bolt_advertised__address=:7687</code> specify the Bolt
                listen port for incoming connections
              </li>
              <li>
                <code>NEO4J_dbms_security_procedures_unrestricted=gds.*,apoc.*</code> allows for all
                graph-data-science and APOC procedures (from the plugins we installed) to be
                available to all users
              </li>
              <li>
                <code>NEO4J_dbms_security_procedures_allowlist=gds.*,apoc.*</code> names certain
                procedures that should be available from a library (see{" "}
                <a href="https://neo4j.com/docs/operations-manual/current/security/securing-extensions/">
                  here
                </a>
                )
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Now, at <code>machine.local/&lt;HTTP_PORT&gt;/browser</code> we can access the{" "}
          <a href="https://neo4j.com/developer/neo4j-browser/">Neo4j Browser WebUI</a>:
        </p>
        <div className="text-center">
          <img
            alt="Neo4j Browser WebUI"
            src="/assets/images/posts/2021-07-01-neo4j-with-docker/neo4j-browser.jpg"
            width={800}
          />
        </div>
        <h2>Upgrade to Neo4j Enterprise &amp; Bloom</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          If you want to use the enterprise version with{" "}
          <a href="https://neo4j.com/product/bloom/">Neo4j Bloom</a> (neither is available for
          free), you need the <code>neo4j:4.3.1-enterprise</code> Docker image and a valid
          activation key for the Bloom server. Then, proceed with the following steps:
        </p>
        <ol>
          <li>
            download the <a href="https://neo4j.com/download-center/#bloom">Bloom server package</a>
          </li>
          <li>
            unzip the downloaded package and place the <code>4.x</code> <code>.jar</code> file into
            the <code>neo4j-plugins</code> docker volume
          </li>
          <li>
            create a new <code>neo4j-licenses</code> volume and place your{" "}
            <code>bloom.license</code> file in it
          </li>
          <li>
            now you are ready to start the server:
            <pre>
              <code>{`    docker run -d --restart always \\
      --env NEO4J_ACCEPT_LICENSE_AGREEMENT=yes \\
      --env=NEO4J_AUTH=neo4j/<YOUR_PASSWORD> \\
      --env=NEO4JLABS_PLUGINS='["apoc","bloom","graph-data-science","n10s"]' \\
      --env=NEO4J_dbms_connector_http_listen__address=:6476 \\
      --env=NEO4J_dbms_connector_https_listen__address=:6477 \\
      --env=NEO4J_dbms_connector_bolt_listen__address=:7687 \\
      --env=NEO4J_dbms_connector_http_advertised__address=:6476 \\
      --env=NEO4J_dbms_connector_https_advertised__address=:6477 \\
      --env=NEO4J_dbms_connector_bolt_advertised__address=:7687 \\
      --env=NEO4J_dbms_security_procedures_unrestricted=gds.*,apoc.*,bloom.* \\
      --env=NEO4J_dbms_security_procedures_allowlist=gds.*,apoc.*,bloom \\
      --env=NEO4J_dbms_unmanaged__extension__classes=com.neo4j.bloom.server=/browser/bloom \\
      --env=NEO4J_neo4j_bloom_license__file=/licenses/bloom.license \\
      --publish=<HTTP_PORT>:6476 \\
      --publish=<HTTPS_PORT>:6477 \\
      --publish=<BOLT_PORT>:7687 \\
      --volume=neo4j-data:/data \\
      --volume=neo4j-import:/var/lib/neo4j/import \\
      --volume=neo4j-licenses:/licenses \\
      --volume=neo4j-plugins:/plugins \\
      --name=neo4j-server \\
      neo4j:4.3.0-enterprise`}</code>
            </pre>
          </li>
        </ol>
      </>
    </ArticlePage>
  );
}
