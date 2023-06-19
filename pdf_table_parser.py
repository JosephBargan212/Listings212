"""
MIT License

Copyright (c) 2019-2021 Camelot Developers Copyright (c) 2018-2019 Peeply Private Ltd (Singapore)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"""


"""
Dependcies

Camelot.py
https://camelot-py.readthedocs.io/en/master/index.html

GhostScrip
https://www.ghostscript.com/

Tkinter
https://docs.python.org/3/library/tkinter.html



"""

import os
import camelot


import csv
    

if __name__ == '__main__':

    file = "mw2305.pdf"

    outf = "2305"


    tables = camelot.read_pdf(file, pages = "3", flavor = "stream" )

    outa = "A_Output_" + outf + ".csv"

    tables[0].to_csv(outa)



    headers = ["Area", "Sales", "Dollar Volume", "Average Price", "Median Price", "New Listings", "SNLR Trend", "Active Listings", "Mos Inv (Trend)", "Avg. Sp/LP", "Avg. LDOM", "Avg. PDOM", "YoY Change"]


    clean_file = open("Clean_" + outa, "w", newline='')

    writer = csv.DictWriter(clean_file, headers, extrasaction = "ignore")

    last_year = str(int(outf) - 100)

    last_years_file = "Clean_A_Output_" + last_year + ".csv"

    try:
        lyf = open(last_years_file, mode = "r")
        reader2 = csv.DictReader(lyf, headers)
        
    except:
        last_year = 0

    with open(outa, mode = "r") as dirty_file:

        reader = csv.DictReader(dirty_file, headers)

        line_count = 0

        prev_line = [];

        for row in reader:

            line_count += 1

            current_row = row

            if len(row["Area"]) == 0:

                prev_line = row

                continue

            elif (row["Area"] == "Sub_Municipality"):

                prev_line = row

                continue

            if (line_count > 3):

                #print(row["Area"])


                flag = False

                for key in headers:

                    try:
                        row[key] = row[key].replace(",","'")
       
                        x = row[key].splitlines()

                    except:
                        pass


                    if len(x) > 1:

                        flag = True

                        current_row[key] = x[1]


                    if flag:

                        for key in headers:

                            if row[key] == prev_line[key]:
                                continue

                            elif row[key] is None:
                                continue

                            current_row[key] = row[key].removeprefix(prev_line[key])
                            
                if(last_year):

                    row2 = next(reader2)

                    test123 = current_row["Average Price"]

                    z = int(''.join(c for c in row2["Average Price"] if c.isdigit()))

                    v = int(''.join(c for c in current_row["Average Price"] if c.isdigit()))

                    w = (100 - ((v/z) * 100) ) * -1

                    current_row["YoY Change"] = round(w * 100) / 100
    
            writer.writerow(current_row)

            prev_line = row

    dirty_file.close()
    clean_file.close()

    if(last_year):
        lyf.close()
