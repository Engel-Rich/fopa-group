class MonthlySalesModel {
  final int month;
  final int year;
  final double totalSales;
  final int totalOrders;
  final double totalAmountPaid;
  final double totalDebt;

  MonthlySalesModel({
    required this.month,
    required this.year,
    required this.totalSales,
    required this.totalOrders,
    required this.totalAmountPaid,
    required this.totalDebt,
  });

  factory MonthlySalesModel.fromJson(Map<String, dynamic> json) {
    return MonthlySalesModel(
      month: json['month'] as int,
      year: json['year'] as int,
      totalSales: (json['totalSales'] as num).toDouble(),
      totalOrders: json['totalOrders'] as int,
      totalAmountPaid: (json['totalAmountPaid'] as num).toDouble(),
      totalDebt: (json['totalDebt'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'month': month,
      'year': year,
      'totalSales': totalSales,
      'totalOrders': totalOrders,
      'totalAmountPaid': totalAmountPaid,
      'totalDebt': totalDebt,
    };
  }
}
