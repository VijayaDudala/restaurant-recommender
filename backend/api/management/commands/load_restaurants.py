import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Restaurant

class Command(BaseCommand):
    help = "Load restaurant data"

    def handle(self, *args, **kwargs):
        file_path = "Zomato-data-.csv"

        df = pd.read_csv(file_path)
        df = df.head(500)

        for _, row in df.iterrows():
            try:
                rating_str = str(row.get('rate', '0'))
                rating = float(rating_str.split('/')[0]) if rating_str != "nan" else 0

                Restaurant.objects.create(
                    name=str(row.get('name', 'Unknown')),
                    cuisine=str(row.get('listed_in(type)', 'Unknown')),
                    location=str(row.get('approx_cost(for two people)', 'Unknown')),
                    rating=rating
                )

            except Exception as e:
                print("Error:", e)

        self.stdout.write(self.style.SUCCESS("✅ Restaurant data loaded"))