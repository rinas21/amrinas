const fs = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '..', 'blogs');

const expansions = {
    'docker-compose-intro.html': `
        <h1>Introduction to Docker Compose</h1>
        <p>
            When developing modern applications, you rarely rely on a single service. A typical web application requires a frontend, a backend API, a database, and perhaps a caching layer like Redis. Managing all these containers manually with individual <code>docker run</code> commands becomes tedious and error-prone. This is where <strong>Docker Compose</strong> comes in.
        </p>
        
        <h2>What is Docker Compose?</h2>
        <p>
            Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file (usually named <code>docker-compose.yml</code>) to configure your application's services, networks, and volumes. Then, with a single command, you create and start all the services from your configuration.
        </p>

        <h2>Anatomy of a docker-compose.yml File</h2>
        <p>
            Let's look at a practical example. Imagine we are building a Node.js API that connects to a PostgreSQL database. Here is what our Compose file would look like:
        </p>
        <pre><code>version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=secret
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
</code></pre>

        <h2>Key Concepts Explained</h2>
        <h3>Services</h3>
        <p>
            The <code>services</code> block defines the containers that will make up your application. In the example above, we have two services: <code>api</code> and <code>db</code>. The <code>api</code> service is built from a local Dockerfile, while the <code>db</code> service uses an official PostgreSQL image from Docker Hub.
        </p>
        
        <h3>Environment Variables</h3>
        <p>
            The <code>environment</code> section allows you to pass variables into the container. Notice how the <code>api</code> service uses <code>DB_HOST=db</code>. Docker Compose automatically sets up a default network where services can communicate with each other using their service names as hostnames.
        </p>

        <h3>Volumes</h3>
        <p>
            Containers are ephemeral by default. If the <code>db</code> container crashes or is removed, all your database data is lost. We solve this by defining a named volume (<code>pgdata</code>) and mounting it to the PostgreSQL data directory inside the container. This ensures data persistence across container restarts.
        </p>

        <h2>Useful Docker Compose Commands</h2>
        <ul>
            <li><code>docker-compose up -d</code>: Starts all services in the background (detached mode).</li>
            <li><code>docker-compose down</code>: Stops and removes all containers, networks, and anonymous volumes.</li>
            <li><code>docker-compose logs -f</code>: Tails the logs of all running services, which is incredibly useful for debugging.</li>
            <li><code>docker-compose exec [service_name] bash</code>: Opens a shell inside a running service container.</li>
        </ul>
        
        <p>
            Mastering Docker Compose will dramatically improve your local development workflow, ensuring consistency between your local machine and your team's environments.
        </p>
    `,
    'kubernetes-intro.html': `
        <h1>Introduction to Kubernetes</h1>
        <p>
            As organizations move towards microservices architectures, managing thousands of containers across dozens of servers becomes impossible to do manually. <strong>Kubernetes</strong> (often abbreviated as K8s) is an open-source container orchestration system designed to automate the deployment, scaling, and management of containerized applications.
        </p>

        <h2>Why do we need Kubernetes?</h2>
        <p>
            While Docker helps you package and run an application in a container, Kubernetes solves the problem of running those containers in production. If a container crashes, Kubernetes restarts it. If traffic spikes, Kubernetes scales the application across multiple servers. It abstracts away the underlying hardware and allows you to treat a cluster of machines as a single computing resource.
        </p>

        <h2>Core Kubernetes Components</h2>
        
        <h3>1. Pods</h3>
        <p>
            A Pod is the smallest deployable computing unit in Kubernetes. Unlike Docker, where you deploy containers directly, in Kubernetes you deploy Pods. A Pod usually encapsulates one container, but it can contain multiple tightly-coupled containers that share storage and a local network.
        </p>

        <h3>2. Deployments</h3>
        <p>
            While you can deploy a Pod manually, it's rarely done in practice because Pods are mortal—they don't self-heal. Instead, you use a <strong>Deployment</strong>. A Deployment instructs Kubernetes on how many replicas of a Pod should be running. If a node fails and takes down three of your Pods, the Deployment controller automatically spins up three new Pods on healthy nodes.
        </p>
        <p>Here is an example of a simple Nginx Deployment in YAML:</p>
        <pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
</code></pre>

        <h3>3. Services</h3>
        <p>
            Since Pods are constantly being created and destroyed, their IP addresses change constantly. A <strong>Service</strong> provides a stable IP address and DNS name that routes traffic to a specific set of Pods (usually selected via labels). This allows the frontend of your application to always know how to talk to the backend, regardless of which specific Pods are currently alive.
        </p>

        <h2>Basic kubectl Commands</h2>
        <p>
            <code>kubectl</code> is the command-line tool used to interact with a Kubernetes cluster.
        </p>
        <ul>
            <li><code>kubectl apply -f deployment.yaml</code>: Creates or updates resources defined in a YAML file.</li>
            <li><code>kubectl get pods</code>: Lists all running Pods in the current namespace.</li>
            <li><code>kubectl describe pod [pod-name]</code>: Provides detailed information and event logs for a specific Pod, useful for debugging CrashLoopBackOff errors.</li>
            <li><code>kubectl logs [pod-name]</code>: Fetches the standard output logs of the container inside the Pod.</li>
        </ul>
        
        <p>
            Kubernetes has a steep learning curve, but mastering its declarative configuration model is essential for modern DevOps and site reliability engineering.
        </p>
    `,
    'essential-sql-queries.html': `
        <h1>Essential SQL Queries Every Developer Should Know</h1>
        <p>
            Despite the rise of NoSQL databases, relational databases (like PostgreSQL, MySQL, and SQL Server) remain the backbone of most enterprise software systems. Understanding how to efficiently extract, manipulate, and analyze relational data is a critical skill for any backend developer or data engineer. In this tutorial, we will move beyond basic <code>SELECT *</code> statements and explore essential intermediate SQL concepts.
        </p>

        <h2>1. Mastering JOINs</h2>
        <p>
            Relational databases store data in normalized tables to prevent duplication. To get a complete picture, you need to combine tables using JOINs.
        </p>
        <ul>
            <li><strong>INNER JOIN:</strong> Returns records that have matching values in both tables.</li>
            <li><strong>LEFT JOIN:</strong> Returns all records from the left table, and the matched records from the right table. If there is no match, the result is NULL on the right side.</li>
        </ul>
        <pre><code>-- Find all orders and their associated customer details
-- If a customer has no orders, they will NOT appear in this result
SELECT customers.name, orders.order_date, orders.total_amount
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;

-- Find ALL customers, and their orders if they have any
SELECT customers.name, orders.order_date
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
</code></pre>

        <h2>2. Aggregations and GROUP BY</h2>
        <p>
            Often, you don't want raw rows; you want summarized data (e.g., total sales per user, average account balance). This is where aggregation functions (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MAX</code>, <code>MIN</code>) and the <code>GROUP BY</code> clause come in.
        </p>
        <pre><code>-- Calculate the total revenue generated by each customer
SELECT customers.name, SUM(orders.total_amount) as lifetime_value
FROM customers
JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name
ORDER BY lifetime_value DESC;
</code></pre>

        <h2>3. The HAVING Clause</h2>
        <p>
            What if you only want to see customers whose lifetime value is greater than $1,000? You cannot use a <code>WHERE</code> clause on aggregated data. Instead, you must use the <code>HAVING</code> clause.
        </p>
        <pre><code>SELECT customers.name, SUM(orders.total_amount) as lifetime_value
FROM customers
JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name
HAVING SUM(orders.total_amount) > 1000;
</code></pre>

        <h2>4. Subqueries and Common Table Expressions (CTEs)</h2>
        <p>
            Sometimes, writing a query requires multiple logical steps. While you can nest queries (Subqueries), utilizing a Common Table Expression (CTE) using the <code>WITH</code> clause makes complex queries significantly more readable.
        </p>
        <pre><code>-- Find all customers who spent above the average order amount
WITH AverageOrder AS (
    SELECT AVG(total_amount) as avg_amount FROM orders
)
SELECT customers.name, orders.total_amount
FROM customers
JOIN orders ON customers.id = orders.customer_id
WHERE orders.total_amount > (SELECT avg_amount FROM AverageOrder);
</code></pre>
        <p>
            Writing efficient SQL is an art. Always remember to analyze your query execution plans (using <code>EXPLAIN</code> in PostgreSQL/MySQL) to ensure you are utilizing indexes effectively and avoiding full table scans on large datasets!
        </p>
    `
};

for (const [filename, newContent] of Object.entries(expansions)) {
    const filePath = path.join(BLOGS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to replace the thin content inside <article class="blog-post-container"> ... <hr
    const articleRegex = /<article class="blog-post-container">[\s\S]*?<hr style="margin: 40px 0;/i;
    
    if (articleRegex.test(content)) {
        content = content.replace(articleRegex, `<article class="blog-post-container">\n${newContent}\n        <hr style="margin: 40px 0;`);
        fs.writeFileSync(filePath, content);
        console.log(`Expanded ${filename}`);
    } else {
        console.error(`Could not find article container in ${filename}`);
    }
}
