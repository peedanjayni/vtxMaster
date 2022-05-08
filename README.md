# VTX Subgraph

Subgraph for VectorFinance on Avalanche.

## README

All value results are in 8 decimals.

Postman example

https://documenter.getpostman.com/view/20430465/UyxdLpa6

## KNOWN ISSUES

1. Fetching all the stats in every block could be very slow, need optimization.For now, just skip some blocks.

2. UST QI bonus APRs are using the rewarder contract emission rate to do the math.

3. Fee rates are set as constants for now.

4. FarmLensV2 have lower APRs and doesn't match the official calculator the official calculator(https://www.vejoeboostcalculator.com).Not using FarmLensV2 for now.

5. Traderjoe Volume calculated from half a day, may not be so accurate,need optimization.

6. LP APRs will not be shown until the subgraph scanned a half-day period.

7. Numbers are not fully tested with all situations.
