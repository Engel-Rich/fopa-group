enum PackageTransactionType { LEND, RETURN }

class PackageTransactionModel {
  final String id;
  final String customerId;
  final PackageTransactionType type;
  final int quantity;
  final String userId;
  final String? notes;
  final DateTime createdAt;

  PackageTransactionModel({
    required this.id,
    required this.customerId,
    required this.type,
    required this.quantity,
    required this.userId,
    this.notes,
    required this.createdAt,
  });

  factory PackageTransactionModel.fromJson(Map<String, dynamic> json) {
    return PackageTransactionModel(
      id: json['id'] as String,
      customerId: json['customerId'] as String,
      type: PackageTransactionType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => PackageTransactionType.LEND,
      ),
      quantity: json['quantity'] as int,
      userId: json['userId'] as String,
      notes: json['notes'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'customerId': customerId,
        'type': type.name,
        'quantity': quantity,
        'userId': userId,
        'notes': notes,
        'createdAt': createdAt.toIso8601String(),
      };
}
