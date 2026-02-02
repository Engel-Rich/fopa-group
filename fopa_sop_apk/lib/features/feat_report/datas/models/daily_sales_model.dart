class DailySalesModel {
  final DateTime date;
  final double totalSales;
  final int totalOrders;
  final double totalAmountPaid;
  final double totalDebt;

  DailySalesModel({
    required this.date,
    required this.totalSales,
    required this.totalOrders,
    required this.totalAmountPaid,
    required this.totalDebt,
  });

  factory DailySalesModel.fromJson(Map<String, dynamic> json) {
    return DailySalesModel(
      date: DateTime.parse(json['date'] as String),
      totalSales: (json['totalSales'] as num).toDouble(),
      totalOrders: json['totalOrders'] as int,
      totalAmountPaid: (json['totalAmountPaid'] as num).toDouble(),
      totalDebt: (json['totalDebt'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'totalSales': totalSales,
      'totalOrders': totalOrders,
      'totalAmountPaid': totalAmountPaid,
      'totalDebt': totalDebt,
    };
  }
}
