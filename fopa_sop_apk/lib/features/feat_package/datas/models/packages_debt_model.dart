class PackagesDebtModel {
  final String customerId;
  final int currentPackagesDebt;

  PackagesDebtModel({
    required this.customerId,
    required this.currentPackagesDebt,
  });

  factory PackagesDebtModel.fromJson(Map<String, dynamic> json) {
    return PackagesDebtModel(
      customerId: json['customerId'] as String,
      currentPackagesDebt: json['currentPackagesDebt'] as int,
    );
  }

  Map<String, dynamic> toJson() => {
        'customerId': customerId,
        'currentPackagesDebt': currentPackagesDebt,
      };
}
