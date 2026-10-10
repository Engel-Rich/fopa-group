enum PackageTransactionType { LEND, RETURN }

class PackageTransactionModel {
  final String id;
  final String customerId;
  final String? customerName;
  final PackageTransactionType type;
  final int quantity;
  final String userId;
  final String? userName;
  final String? notes;
  final DateTime createdAt;

  /// Dette d'emballages du client après l'opération (renvoyée par lend/return).
  final int? currentPackagesDebt;

  PackageTransactionModel({
    required this.id,
    required this.customerId,
    this.customerName,
    required this.type,
    required this.quantity,
    required this.userId,
    this.userName,
    this.notes,
    required this.createdAt,
    this.currentPackagesDebt,
  });

  factory PackageTransactionModel.fromJson(Map<String, dynamic> json) {
    return PackageTransactionModel(
      id: json['id'] as String,
      customerId: json['customerId'] as String,
      customerName: json['customerName'] as String?,
      type: PackageTransactionType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => PackageTransactionType.LEND,
      ),
      quantity: (json['quantity'] as num).toInt(),
      userId: json['userId'] as String,
      userName: json['userName'] as String?,
      notes: json['notes'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String).toLocal(),
      currentPackagesDebt: (json['currentPackagesDebt'] as num?)?.toInt(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'customerId': customerId,
    'customerName': customerName,
    'type': type.name,
    'quantity': quantity,
    'userId': userId,
    'userName': userName,
    'notes': notes,
    'createdAt': createdAt.toIso8601String(),
    'currentPackagesDebt': currentPackagesDebt,
  };
}
