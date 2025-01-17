import { createServer } from 'node:http';
import { exec } from 'node:child_process';
import { stderr } from 'node:process';

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
  console.info(`request: ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url != '/favicon.ico') {
    //exec('spark-submit --packages io.delta:delta-spark_2.13-3.3.0 /scripts/mypysparkscript.py', (error, stdout, stderr) => {
    exec('spark-submit --master spark://spark-master:7077 --packages io.delta:delta-spark_2.12:3.3.0 --conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension" --conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog" /scripts/mypysparkscript.py', (error, stdout, stderr) => {
      if(error) {
        console.error(`Error executing the script: ${error.message}`);
        console.log(`stderr: ${stderr}`);
        return;
      } else {
        console.log('Script executed');
        console.log(`stdout: ${stdout}`);
      }
    })
  }
  

  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
