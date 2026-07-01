"""Normalize the Kaggle 2025/26 CSV into the browser app's schema."""
import csv, json, sys
from pathlib import Path
source=Path(sys.argv[1]); target=Path(__file__).resolve().parents[1]/"data.generated.js"
def number(row,key):
    try:return float(row.get(key) or 0)
    except ValueError:return 0
def per90(row,key):
    n=number(row,"90s"); return round(number(row,key)/n,2) if n else 0
def position(raw):
    if "FW" in raw:return "Forward"
    if "MF" in raw:return "Midfielder"
    return "Defender"
players=[]
with source.open(encoding="utf-8-sig",newline="") as handle:
    for row in csv.DictReader(handle):
        if number(row,"90s")<3 or "GK" in row["Pos"]:continue
        age=int(number(row,"Age")); goals=per90(row,"Gls"); assists=per90(row,"Ast")
        tackles=per90(row,"TklW"); interceptions=per90(row,"Int"); fouls=per90(row,"Fls"); role=position(row["Pos"]); seed=goals*4+assists*3
        # The source lacks the fields below marked as estimates. They are stable,
        # conservative prototype values—not claims about real player performance.
        players.append({"name":row["Player"],"club":row["Squad"],"country":row["Nation"].split()[-1] if row["Nation"] else "—","age":age,"position":role,
          "marketValue":max(2,min(120,round((34-age)*1.8+seed*10))),"goalsPer90":goals,"assistsPer90":assists,"xGPer90":round(goals*.88+per90(row,"Sh")*.03,2),"xAPer90":round(assists*.82+per90(row,"Crs")*.025,2),
          "tacklesPer90":tackles,"interceptionsPer90":interceptions,"progressiveCarriesPer90":round(1.2+seed+(.8 if role=="Forward" else 0),2),"progressivePassesPer90":round(2.5+assists*8+(1.2 if role=="Midfielder" else 0),2),
          "successfulDribblesPer90":round(.5+seed*.8,2),"foulsPer90":fouls,"pressuresPer90":round(8+tackles*2.4+fouls*1.6,2),"estimatedFields":True})
target.write_text("// Generated from Kaggle; see scripts/import_kaggle_dataset.py.\nexport const kagglePlayers="+json.dumps(players,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
print(f"Wrote {len(players)} players to {target}")
