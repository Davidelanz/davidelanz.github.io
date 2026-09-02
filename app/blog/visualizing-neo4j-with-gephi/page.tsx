import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { definePostMetadata } from "../post-metadata";

export const metadata: Metadata = definePostMetadata({
  title: "Visualizing Huge Neo4j Graphs with Gephi",
  description:
    "Set up Gephi and stream data from a Neo4j server as an open alternative for exploring large graphs.",
  date: "2021-07-18",
  tags: ["Graphs", "Neo4j", "Gephi"],
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
          Visualizing a huge graph with <a href="https://neo4j.com/">Neo4j Community Edition</a> is
          painful, and it does not work with huge graphs.{" "}
          <a href="https://neo4j.com/product/bloom/">Neo4j Bloom</a> is a great tool for dealing
          with such problems, but it has one drawback: it is not free. A good alternative to Neo4j
          Bloom (included in Neo4j Enterprise Edition) is <a href="https://gephi.org/">Gephi</a>,
          excellent visualization and exploration software that is also open-source and free. Here,
          we see how to set up Gephi and stream data from a Neo4j server.
        </p>
        <blockquote>
          <p>
            <a href="https://gephi.wordpress.com/2018/11/01/is-gephi-obsolete-situation-and-perspectives/">
              Is Gephi obsolete?
            </a>{" "}
            Yes, the software released its{" "}
            <a href="https://github.com/gephi/gephi/releases/tag/v0.9.2">0.9.2 version</a> on
            September 24, 2017, and little has been done since then. A{" "}
            <a href="https://github.com/gephi/viz-engine">new visualization engine</a> was under
            development, but right now it does not seem like a valuable alternative. Despite all
            this, Gephi is still a very powerful tool for visualizing huge graphs, so enjoy it while
            it lasts!
          </p>
        </blockquote>
        <h2 id="contents"> Contents </h2>
        <ul>
          <li>
            <a href="#introduction">Introduction</a>
          </li>
          <li>
            <a href="#initialize-the-dataset">Initialize the dataset</a>
          </li>
          <li>
            <a href="#setting-up-gephi">Setting Up Gephi</a>
          </li>
          <li>
            <a href="#streaming-data-from-neo4j">Streaming Data from Neo4j</a>
          </li>
          <li>
            <a href="#data-visualization">Data Visualization</a>
          </li>
          <li>
            <a href="#references">References</a>
          </li>
        </ul>
        <h2>Introduction</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          An excellent graph visualization is worth more than a thousand statistics.{" "}
          <a href="https://gephi.org/">Gephi</a> is a great tool for creating network
          visualizations, especially because APOC offers a handy procedure (
          <code>apoc.gephi.add</code>) that seamlessly streams network data from Neo4j to Gephi.
          Here, we will show how to stream data from a Neo4j graph database to Gephi and exploit the
          latter for visualization purposes.
        </p>
        <h2>Initialize the dataset</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          We will use a part of the Northwind Dataset (check out{" "}
          <a href="/blog/neo4j-with-docker#the-northwind-dataset">this article</a> for more info),
          specifically, we will use the <code>Order</code>, <code>Product</code>, and{" "}
          <code>Employee</code> relationships:
        </p>
        <div className="text-center">
          <img
            alt="Northwind dataset ER diagram"
            src="https://dist.neo4j.com/wp-content/uploads/Northwind_diagram.jpg"
            width={800}
          />
        </div>
        <p>
          We can import data from a CSV file at a remote location into Neo4j, so we will initialize
          our graph database as follows (run the commands between the <code>--</code> and{" "}
          <code>--&gt;</code> lines):
        </p>
        <pre>
          <code className="language-sql">{`-- Create "Order" nodes:
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/jexp/054bc6baf36604061bf407aa8cd08608/raw/8bdd36dfc88381995e6823ff3f419b5a0cb8ac4f/orders.csv' AS row
MERGE (order:Order {orderID: row.OrderID})
ON CREATE SET order.shipName = row.ShipName;
--> Added 830 labels, created 830 nodes, set 1660 properties, completed after 2298 ms.

-- Create "Employee" nodes:
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/jexp/054bc6baf36604061bf407aa8cd08608/raw/8bdd36dfc88381995e6823ff3f419b5a0cb8ac4f/employees.csv' AS row
MERGE (order:Employee {employeeID: row.EmployeeID})
    ON CREATE SET order.firstName = row.FirstName, order.lastName = row.LastName;
--> Added 9 labels, created 9 nodes, set 27 properties, completed after 474 ms.

-- Create "Product" nodes
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/jexp/054bc6baf36604061bf407aa8cd08608/raw/8bdd36dfc88381995e6823ff3f419b5a0cb8ac4f/products.csv' AS row
MERGE (product:Product {productID: row.ProductID})
    ON CREATE SET product.productName = row.ProductName, product.unitPrice = toFloat(row.UnitPrice);
--> Added 77 labels, created 77 nodes, set 231 properties, completed after 532 ms.

-- create "SOLD" relationships between orders and employees:
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/jexp/054bc6baf36604061bf407aa8cd08608/raw/8bdd36dfc88381995e6823ff3f419b5a0cb8ac4f/orders.csv' AS row
MATCH (order:Order {orderID: row.OrderID})
MATCH (employee:Employee {employeeID: row.EmployeeID})
MERGE (employee)-[:SOLD]->(order);
--> Created 830 relationships, completed after 1617 ms.

-- create "CONTAINS" relationships between orders and products
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/jexp/054bc6baf36604061bf407aa8cd08608/raw/8bdd36dfc88381995e6823ff3f419b5a0cb8ac4f/orders.csv' AS row
MATCH (order:Order {orderID: row.OrderID})
MATCH (product:Product {productID: row.ProductID})
MERGE (order)-[op:CONTAINS]->(product)
    ON CREATE SET op.unitPrice = toFloat(row.UnitPrice), op.quantity = toFloat(row.Quantity)
--> Set 4310 properties, created 2155 relationships, completed after 1188 ms.`}</code>
        </pre>
        <p>
          Now, we can try to visualize our Graph via the{" "}
          <a href="https://neo4j.com/developer/neo4j-browser/">Neo4j Browser</a>:
        </p>
        <pre>
          <code className="language-sql">{`MATCH (e:Employee)-[r1:SOLD]-(o:Order)-[r2:CONTAINS]-(p:Product) RETURN * `}</code>
        </pre>
        <div className="text-center">
          <img
            alt="Neo4j Browser Visualization"
            src="/assets/images/posts/2021-07-18-visualizing-neo4j-with-gephi/browser-visualization.jpg"
            width={1000}
          />
        </div>
        This is not pretty at all. Moreover, we are just visualizing 300 nodes out of the 916 total
        nodes! This is where Gephi comes to our rescue.
        <h2>Setting Up Gephi</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          After <a href="https://gephi.org/users/install/">installing Gephi</a>, we need to install
          Gephi’s{" "}
          <a href="https://gephi.org/plugins/#/plugin/graphstreaming">Graph Streaming plugin</a>:
        </p>
        <blockquote>
          <p>
            The purpose of the Graph Streaming API and Plugins is to build a unified framework for
            streaming graph objects. Gephi’s data structure and visualization engine have been built
            with the idea that a graph is not static and might change continuously. By connecting
            Gephi with external data sources, we leverage its power to visualize and monitor complex
            systems or enterprise data in real-time. Moreover, the idea of streaming graph data goes
            beyond Gephi, and a unified and standardized API could bring interoperability with other
            available tools for graph and network analysis, as they could start to interoperate with
            other tools in a distributed and cooperative fashion.
          </p>
        </blockquote>
        <p>
          This is why Gephi is so powerful as a visualization tool! To install it, we can easily
          navigate to the <code>Tools --&gt; Plugins --&gt; Available Plugins</code> tab in Gephi,
          search for the graph streaming plugin and install it.
        </p>
        <p>
          Now, we just have to create a new project with a workspace (let’s say, “Workspace 1”) and
          turn on the streaming server as shown below:
        </p>
        <div className="text-center">
          <img
            alt="Neo4j Browser Visualization"
            src="/assets/images/posts/2021-07-18-visualizing-neo4j-with-gephi/start-server-gephi.jpg"
            width={400}
          />
        </div>
        <p>Now we’re ready to send nodes to Gephi from our Neo4j Browser to visualize them.</p>
        <h2>Streaming Data from Neo4j</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Neo4j’s <a href="https://neo4j.com/developer/neo4j-apoc/">APOC</a> library offers a handy
          procedure{" "}
          <a href="https://neo4j.com/labs/apoc/4.2/overview/apoc.gephi/apoc.gephi.add/">
            <code>apoc.gephi.add</code>
          </a>{" "}
          that seamlessly streams network data from Neo4j to Gephi:
        </p>
        <pre>
          <code>{`apoc.gephi.add(
    urlOrKey :: STRING?,
    workspace :: STRING?,
    data :: ANY?,
    weightproperty = null :: STRING?,
    exportproperties = [] :: LIST? OF STRING?
)`}</code>
        </pre>
        <div className="row justify-content-center mx-auto mb-4">
          <div className="col-md-9">
            <object
              type="image/svg+xml"
              className="w-100"
              data="/assets/images/posts/2021-07-18-visualizing-neo4j-with-gephi/neo4j-stream-gephi.svg"
            >
              Neo4j Browser streaming via APOC to Gephi Workspace
            </object>
          </div>
        </div>
        <p>
          For example, we can stream our data as an <strong>unweighted undirected network</strong>{" "}
          (here we include an optional upper bound of 10000 nodes):
        </p>
        <pre>
          <code className="language-sql">{`MATCH path = (:Employee)-[:SOLD]-(:Order)-[:CONTAINS]-(:Product)
WITH path LIMIT 10000
WITH collect(path) as paths
CALL apoc.gephi.add('http://gephimachine.local:8080','workspace1', paths) YIELD nodes, relationships, time
RETURN nodes, relationships, time`}</code>
        </pre>
        <blockquote>
          <p>
            A{" "}
            <a href="https://github.com/neo4j-contrib/neo4j-apoc-procedures/issues/740#issuecomment-381627206">
              well-known Gephi bug on Windows
            </a>{" "}
            is triggered if some of the nodes streamed have accented characters such as{" "}
            <code>ö</code> or <code>å</code>. It causes trouble because it raises errors like the
            following one, interrupting the streaming:
          </p>
          <pre>
            <code>{`Failed to invoke procedure \`apoc.gephi.add\`:
  Caused by: com.fasterxml.jackson.core.JsonParseException:
    Invalid UTF-8 middle byte 0x74 at [
      Source: (apoc.export.util.CountingInputStream);
       line: 2, column: 138 ]`}</code>
          </pre>
          <p>
            This, of course, does not happen when we work with a database without special
            characters.
          </p>
          <p>
            To solve this problem,{" "}
            <a href="https://stackoverflow.com/a/52338505/13975476">three solutions</a> are
            available:
          </p>
          <ul>
            <li>
              Remove special characters from the data (non-ASCII characters such as <code>ä</code>,{" "}
              <code>Ä</code>, <code>ü</code>, <code>Ü</code>, <code>ö</code>, <code>Ö</code>,{" "}
              <code>ß</code>)
            </li>
            <li>Run Gephi on Linux inside a VM or Docker container</li>
            <li>Update Gephi to a newer version (if one is out, but that is unlikely)</li>
          </ul>
          <p>
            I prefer the first one, so we’re going to remove all non-ASCII characters from our Neo4j
            graph database. The{" "}
            <a href="https://neo4j.com/labs/apoc/4.1/overview/apoc.text/apoc.text.clean/">
              <code>apoc.text.clean</code>
            </a>{" "}
            function is great for such a task.
          </p>
          <p>
            Using{" "}
            <a href="https://neo4j.com/labs/apoc/4.3/overview/apoc.map/apoc.map.merge/">
              <code>apoc.map.merge</code>
            </a>{" "}
            we only affect what is returned:
          </p>
          <pre>
            <code className="language-sql">{`MATCH (e:Employee)
RETURN apoc.map.merge(properties(e), {
  firstName : apoc.text.clean(e.firstName),
  lastName  : apoc.text.clean(e.lastName)
})
--> Started streaming 9 records after 46 ms and completed after 144 ms.

MATCH (o:Order)
RETURN apoc.map.merge(properties(o), {
  shipName : apoc.text.clean(o.shipName)
})
--> Started streaming 830 records after 34 ms and completed after 210 ms.

MATCH (p:Product)
RETURN apoc.map.merge(properties(p), {
  productName : apoc.text.clean(p.productName)
})
--> Started streaming 77 records after 2 ms and completed after 4 ms.`}</code>
          </pre>
          <p>
            Using <code>SET</code> we actually modify the dataset:
          </p>
          <pre>
            <code className="language-sql">{`MATCH (e:Employee)
SET e += {
  firstName : apoc.text.clean(e.firstName),
  lastName  : apoc.text.clean(e.lastName)
}
--> Set 18 properties, completed after 318 ms.

MATCH (o:Order)
SET o += {shipName : apoc.text.clean(o.shipName)}
--> Set 830 properties, completed after 50 ms.

MATCH (p:Product)
SET p += {productName : apoc.text.clean(p.productName)}
--> Set 77 properties, completed after 4 ms.`}</code>
          </pre>
          <p>Now we should have solved our issue.</p>
        </blockquote>
        <p>
          After running the <code>apoc.gephi.add</code> query, we should receive a table like the
          following one:
        </p>
        <table>
          <thead>
            <tr>
              <th>nodes</th>
              <th>relationships</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>916</td>
              <td>2985</td>
              <td>345</td>
            </tr>
          </tbody>
        </table>
        <p>In Gephi we should now finally see our data:</p>
        <div className="row justify-content-center mx-auto mb-4">
          <div className="col-md-9">
            <img
              alt="Imported Data in Gephi"
              src="/assets/images/posts/2021-07-18-visualizing-neo4j-with-gephi/gephi-data1.jpg"
            />
          </div>
        </div>
        <h2>Data Visualization</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Gephi offers lots of useful options, but it has a learning curve because there are so many
          features and you can get lost when first using it. Using the <code>Appearance</code> tab,
          we can set color, size, label color, and label size based on some metrics. For instance,
          it is quite useful to link node size with the log of the node’s degree (in order to plot
          high-degree nodes as larger nodes), and the same applies to text-label size. In the
          following video, we link node and label sizes to the log degree of the corresponding
          nodes, and then we applied the{" "}
          <a href="https://en.wikipedia.org/wiki/Force-directed_graph_drawing">
            Fruchterman Reingold
          </a>{" "}
          layout:
        </p>
        <div className="row justify-content-center mx-auto mb-4">
          <div className="col-md-9">
            <iframe
              className="w-100"
              style={{ height: "480px" }}
              width="860"
              src="https://www.youtube.com/embed/9ieaGi5qVcc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <h2>References</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <ul>
          <li>
            <a href="https://neo4j.com/labs/apoc/4.1/export/gephi/">Neo4j Docs | Export to Gephi</a>
          </li>
          <li>
            <a href="https://gephi.org/tutorials/gephi-tutorial-visualization.pdf">
              Gephi Docs | Gephi Tutorial Visualization
            </a>
          </li>
          <li>
            <a href="https://tbgraph.wordpress.com/2017/04/01/neo4j-to-gephi/">
              Article | Neo4j to Gephi
            </a>
          </li>
          <li>
            <a href="https://towardsdatascience.com/community-detection-of-the-countries-of-the-world-with-neo4j-graph-data-science-4d3a022f8399">
              Article | Community detection of the countries of the world with Neo4j Graph Data
              Science
            </a>
          </li>
          <li>
            <a href="https://gephi.wordpress.com/2018/11/01/is-gephi-obsolete-situation-and-perspectives/">
              Article | Is Gephi obsolete? Situation and perspectives
            </a>
          </li>
        </ul>
      </>
    </ArticlePage>
  );
}
