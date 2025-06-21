import requests
import xml.etree.ElementTree as ET

def get_isbns_from_rss():
    rss_url = "https://www.goodreads.com/review/list_rss/57411206?key=08XgFz6PjuVgWFLAbeByccgIw84OKweJXW0QZj_e_sX3biAv&shelf=good-books"
    response = requests.get(rss_url)
    root = ET.fromstring(response.content)

    isbns = []
    for item in root.findall(".//item"):
        isbn = item.find("isbn13")
        if isbn is not None and isbn.text:
            isbns.append(isbn.text.strip())
    return isbns

if __name__ == "__main__":
    isbns = get_isbns_from_rss()
    for isbn in isbns:
        print(isbn)
    print(f"Total ISBNs found: {len(isbns)}")
    # Save to file
    with open("isbns.txt", "w") as f:
        for isbn in isbns:
            f.write(f"{isbn}\n")
    print("ISBNs saved to isbns.txt")
    print("Done.")
    print("You can now run the script to get the ISBNs from Goodreads RSS feed.")
    print("Make sure to have the requests and xml libraries installed.")