class PackageDebtorModel {
  final String customerId;
  final String name;
  final String? phone;
  final String? address;
  final int currentPackagesDebt;

  PackageDebtorModel({
    required this.customerId,
    required this.name,
    this.phone,
    this.address,
    required this.currentPackagesDebt,
  });

  factory PackageDebtorModel.fromJson(Map<String, dynamic> json) {
    return PackageDebtorModel(
      customerId: json['customerId'] as String,
      name: (json['name'] as String?) ?? '',
      phone: json['phone'] as String?,
      address: json['address'] as String?,
      currentPackagesDebt: (json['currentPackagesDebt'] as num).toInt(),
    );
  }
}

class PackagesDebtsSummaryModel {
  final int totalPackagesDebt;
  final int debtorsCount;
  final int totalLent;
  final int totalReturned;
  final List<PackageDebtorModel> customers;

  PackagesDebtsSummaryModel({
    required this.totalPackagesDebt,
    required this.debtorsCount,
    required this.totalLent,
    required this.totalReturned,
    required this.customers,
  });

  factory PackagesDebtsSummaryModel.fromJson(Map<String, dynamic> json) {
    return PackagesDebtsSummaryModel(
      totalPackagesDebt: (json['totalPackagesDebt'] as num? ?? 0).toInt(),
      debtorsCount: (json['debtorsCount'] as num? ?? 0).toInt(),
      totalLent: (json['totalLent'] as num? ?? 0).toInt(),
      totalReturned: (json['totalReturned'] as num? ?? 0).toInt(),
      customers: ((json['customers'] as List?) ?? [])
          .map((e) => PackageDebtorModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}
