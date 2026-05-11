import pandas as pd
from api.models import Restaurant

def run():
    file_path = r"D:\restaurant-recommender\backend\Zomato-data-.csv"

    df = pd.read_csv(file_path)

    # limit data (safe)
    df = df.head(500)

    for _, row in df.iterrows():
        try:
            # handle rating like "4.1/5"
            rating_str = str(row.get('rate', '0'))
            rating = float(rating_str.split('/')[0]) if rating_str != "nan" else 0

            Restaurant.objects.create(
                name=str(row.get('name', 'Unknown')),
                cuisine=str(row.get('listed_in(type)', 'Unknown')),  # mapped
                location=str(row.get('approx_cost(for two people)', 'Unknown')),  # temporary
                rating=rating
            )

        except Exception as e:
            print("Error:", e)

    print("✅ Data loaded successfully!")
    run()