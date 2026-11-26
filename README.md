# The World Today — Wednesday 25 November 2026

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/ice-makefun/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/ice-makefun/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

A newspaper front page summing up the world's news of **Wednesday 25 November 2026**,
built for the make.fun competition
[news-image-20261125](https://make.fun/c/news-image-20261125) ("Sum up 25 November's
world news in one image"). The image is drawn entirely with PIL primitives —
no photographs, no external images, no network.

## What the image shows

- **Top story — Space:** China launches Shenzhou-24 from Jiuquan, carrying
  Pakistan's first astronaut, Muhammad Zeeshan Ali, to the Tiangong station
  with commander Tang Hongbo and Wu Yi.
- **Strait of Hormuz:** Iran claims it shot down two US drones (an MQ-9 and a
  Lucas drone); Trump says US war funding against Iran is secured through January.
- **Ukraine:** Kyiv waits on Washington for the next round of peace talks;
  Poland prepares a no-fly zone decree on its Ukraine border; 30+ nations urge
  Russia to stop using toxic chemicals as weapons of war.
- **Tech / Markets:** Nvidia brings back Jensen Huang as CEO after Trump's
  intervention; AI shares slide.
- **Cairo:** A fuel tanker fire on the ring road kills at least 30.
- **Around the World:** Australia–Solomon Islands treaty; Spain's snap election;
  the US global anti-scam crackdown (800+ defendants); Sheikh Hasina's planned
  return; the Houthi attack on a Riyadh tower.

## How to run

```sh
# regenerate the image (optional; frontpage.png is already in the repo)
python3 work/compose.py

# write the entry image (Node 22, stdlib only)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# -> out/entry.png, a validated copy of frontpage.png (1024x1024, < 1 MiB)
```

`main.ts` validates the PNG signature, the 1024x1024 dimensions, the IEND
trailer and the 1 MiB cap before copying, and exits non-zero on failure.
Running it twice produces byte-identical output.

## Layout

- `frontpage.png` — the front-page image (1024x1024 PNG).
- `main.ts` — the entry program (Node 22, stdlib only).
- `LICENSE` — MIT.

The image was drawn with a PIL script during the build; the entry ships the
finished PNG, so the program only copies and validates it.
