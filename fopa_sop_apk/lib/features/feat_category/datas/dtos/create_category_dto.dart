class CreateCategoryDto {
  final String name;
  final String? description;

  CreateCategoryDto({required this.name, this.description});

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{'name': name};
    if (description != null) map['description'] = description;
    return map;
  }
}

class UpdateCategoryDto {
  final String name;
  final String? description;

  UpdateCategoryDto({required this.name, this.description});

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{'name': name};
    if (description != null) map['description'] = description;
    return map;
  }
}
