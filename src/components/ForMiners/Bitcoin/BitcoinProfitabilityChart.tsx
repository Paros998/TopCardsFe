import React, { FC } from 'react';
import { InvestmentReturnData } from "../../../interfaces/models/crypto/bitcoin/BitcoinModels";
import { AxisOptions, Chart } from "react-charts";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";

interface BitcoinProfitabilityChartProps {
  investmentData: InvestmentReturnData;
}

interface InvestmentData {
  date: string;
  profit: number;
}

const BitcoinProfitabilityChart: FC<BitcoinProfitabilityChartProps> = ( { investmentData } ) => {
  const { currentUser } = useCurrentUser();
  const { investmentProfit, monthsToReturnInvestedMoney } = investmentData;

  let investment: InvestmentData[] = [];

  for ( let ip in investmentProfit ) {
    investment.push( { date: ip, profit: investmentProfit[ ip ] as unknown as number } )
  }

  const currency = () => {
    if ( !currentUser )
      return 'USD';

    return currentUser.currency;
  }

  const data = [
    {
      label: 'Total Profit ' + currency(),
      data: investment,

    },
  ]

  const primaryAxis = React.useMemo(
    (): AxisOptions<InvestmentData> => ( {
      getValue: datum => datum.date,
    } ),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<InvestmentData>[] => [
      {
        getValue: datum => datum.profit,
        elementType: 'bar',
      },
    ],
    []
  )
  return (
    <Chart
      options={ {
        data,
        primaryAxis,
        secondaryAxes,
        dark: true,
      } }
    />
  );
};

export default BitcoinProfitabilityChart;