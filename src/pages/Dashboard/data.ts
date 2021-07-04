interface circularGraphProps {
  expenses: number;
  income: number;
}

interface lineGraphProps {
  montlyIncome: number[];
  montlyExpenses: number[];
}

export function lineGraph({ montlyIncome, montlyExpenses }: lineGraphProps) {
  const data = {
    options: {
      title: {
        display: true,
        text: "Average Rainfall per month",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      },
      resposive: true,
    },

    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(139, 207, 97, 1)",
          borderColor: "rgba(139, 207, 97, 1)",
          borderWidth: 2,
          data: montlyIncome,
        },
        {
          label: "Expenses",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(222, 90, 90, 1)",
          borderColor: "rgba(222, 90, 90, 1)",
          borderWidth: 2,
          data: montlyExpenses,
        },
      ],
    },
  };

  return data;
}

export function circularGraph({ expenses, income }: circularGraphProps) {
  const dataCirculeGraphs = {
    options: {
      title: {
        display: true,
        text: "Average Rainfall per month",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      },
      resposive: true,
    },
    data: {
      labels: ["Expenses", "Income"],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: ["#DE5A5A", "#8BCF61"],
          hoverBackgroundColor: ["#D45050", "#82C957"],
          data: [Number(expenses), income - expenses],
        },
      ],
    },
  };

  return dataCirculeGraphs;
}
