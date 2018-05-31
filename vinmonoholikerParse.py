import csv
import urllib.request
import requests
import mysql.connector

# creates a dictionary with all of the columns in the csv file
# Will soon^tm make it automatic, shouldn't be hard at all.
productinfo = {"Datotid": 0, "Varenummer": 0, "Varenavn": 0, "Volum": 0, "Pris": 0, "Literpris": 0, "Varetype": 0, "Produktutvalg": 0, "Butikkategori": 0,
               "Fylde": 0, "Friskhet": 0, "Garvestoffer": 0, "Bitterhet": 0, "Sodme": 0, "Farge": 0, "Lukt": 0, "Smak": 0, "PasserTil01": 0, "PasserTil02": 0, "PasserTil03": 0,
               "Land": 0, "Distrikt": 0, "Underdistrikt": 0, "Argang": 0, "Rastoff": 0, "Metode": 0, "Alkohol": 0, "Sukker": 0, "Syre": 0, "Lagringsgrad": 0, "Produsent": 0, "Grossist": 0,
               "Distributor": 0, "Emballasjetype": 0, "Korktype": 0, "Vareurl": 0, "Okologisk": 0, "Biodynamisk": 0, "Fairtrade": 0, "Miljosmart_emballasje": 0, "Gluten_lav_pa": 0, "Kosher": 0}
tableNames = []


def downloadCsv():
    url = "https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv"
    urllib.request.urlretrieve(url, "produkter.csv")


def readCsvFile(filename, encodingType):
    with open(filename, newline="", encoding=encodingType) as csvfile:
        table = csv.reader(csvfile, delimiter=";", quotechar="|")
        tableNames = next(table)
        for i in range(len(tableNames)):
            if tableNames[i] in productinfo:
                productinfo[tableNames[i]] = i
        products = []
        rowLength = 0
    with open(filename, newline="", encoding=encodingType) as csvfile:
        table = csv.reader(csvfile, delimiter=";", quotechar="|")
        for row in table:
            products.append([])
            products[rowLength].append(row[productinfo["Varenummer"]])
            products[rowLength].append(row[productinfo["Varenavn"]])
            products[rowLength].append(row[productinfo["Volum"]])
            products[rowLength].append(row[productinfo["Pris"]])
            products[rowLength].append(row[productinfo["Literpris"]])
            products[rowLength].append(row[productinfo["Varetype"]])
            products[rowLength].append(row[productinfo["Produktutvalg"]])
            products[rowLength].append(row[productinfo["Butikkategori"]])
            products[rowLength].append(row[productinfo["Land"]])
            products[rowLength].append(row[productinfo["Rastoff"]])
            products[rowLength].append(row[productinfo["Metode"]])
            products[rowLength].append(row[productinfo["Alkohol"]])
            products[rowLength].append(row[productinfo["Lagringsgrad"]])
            products[rowLength].append(row[productinfo["Emballasjetype"]])
            products[rowLength].append(row[productinfo["Korktype"]])
            products[rowLength].append(row[productinfo["Vareurl"]])
            products[rowLength].append(row[productinfo["Okologisk"]])
            products[rowLength].append(row[productinfo["Biodynamisk"]])
            products[rowLength].append(row[productinfo["Fairtrade"]])
            products[rowLength].append(
                row[productinfo["Miljosmart_emballasje"]])
            products[rowLength].append(row[productinfo["Gluten_lav_pa"]])
            products[rowLength].append(row[productinfo["Kosher"]])
            rowLength += 1
    return products


def createProductTableCsv(products, filename):
    with open(filename, "w") as csvProductsTable:
        writer = csv.writer(csvProductsTable, delimiter=";")
        for row in products:
            writer.writerow(row)


def uploadtoDatabase(filename, host, username, password, database, table):
    database = mysql.connector.connect(
        host=host, user=username, password=password, db=database)
    cursor = database.cursor()

    sqlLoadDate = (
        "LOAD DATA LOCAL INFILE '{0}' INTO TABLE {1} FIELDS TERMINATED BY ';' ENCLOSED BY '' LINES TERMINATED BY '\\n' IGNORE 1 LINES").format(filename, table)
    print(sqlLoadDate)

    cursor.execute(sqlLoadDate)
    database.commit()

    cursor.close()
    database.close()


def main():
    user = "USER"
    database = "localhost"
    password = "PASSWORD"
    downloadCsv()
    newProducts = readCsvFile("produkter.csv", "iso-8859-1")
    createProductTableCsv(newProducts, "productsTable.csv")
    uploadtoDatabase("productsTable.csv",
                     database, user, password, "vinmonopol", "Products")


if __name__ == "__main__":
    main()
