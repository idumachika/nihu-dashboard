export default [
    {
      name: "reference",
      title: '<i class="grey user outline icon"></i>Reverence',
      width: "20%",
      sortField: "reference"
    },
    {
      name: "amount",
      title: '<i class="grey mail outline icon"></i>Amount',
      width: "20%",
      sortField: "amount"
    },
    {
      name: "user",
      sortField: "user",
      title: '<i class="grey sitemap icon"></i>User',
      width: "15%"
    },
    {
      name: "paid_for",
      title: '<i class="grey heterosexual icon"></i>For',
      titleClass: "center aligned",
      dataClass: "center aligned",
      width: "15%",
      formatter: value => {
        return value.toUpperCase() === "M"
          ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
          : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>';
      },
      sortField: "paid_for"
    }
  ];
  