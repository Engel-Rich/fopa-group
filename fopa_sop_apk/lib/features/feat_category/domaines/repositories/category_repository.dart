import 'package:fopa_sop_apk/features/feat_category/domaines/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

abstract class CategoryRepository {
  Future<CategoryResponseModel> createCategory(CreateCategoryDto dto);
  Future<CategoryResponseModel> updateCategory(
    String id,
    UpdateCategoryDto dto,
  );
  Future<List<CategoryResponseModel>> listCategories();
}
