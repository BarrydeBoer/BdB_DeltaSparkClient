from pyspark.sql import SparkSession
from pyspark.sql import functions as f
from datetime import datetime
from delta import *

print(datetime.now())

# Initialize a Spark session
spark = SparkSession.builder \
    .appName("HelloWorldExample") \
    .getOrCreate()

#print(spark.version)
print(datetime.now())

#builder = SparkSession.builder \
#    .appName("HelloWorldExample") \
#    .master("spark://spark-master:7077") \
#    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
#    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
#spark = configure_spark_with_delta_pip(builder).getOrCreate()


# Create a DataFrame with a "Hello World" message
data = [("Hello, World!", )]
columns = ["Message"]
df = spark.createDataFrame(data, columns).withColumn("current_datetime", f.current_timestamp())
print(datetime.now())
# Show the content of the DataFrame
df.show()
print(datetime.now())
try:
    df.write.format("delta").mode("append").option("overwriteSchema", "true").save("/shared-data/testing/hello-world")
except Exception as e:
    print(f"Error: {e}")
print(datetime.now())
# Stop the Spark session
#spark.stop()