import 'package:fopa_sop_apk/features/feat_category/datas/services/category_service.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/repositories/category_repository.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

class CategoryRepositoryImpl implements CategoryRepository {
  final CategoryService categoryService;

  CategoryRepositoryImpl(this.categoryService);

  @override
  Future<CategoryResponseModel> createCategory(CreateCategoryDto dto) async {
    return await categoryService.createCategory(dto);
  }

  @override
  Future<List<CategoryResponseModel>> listCategories() async {
    return await categoryService.listCategories();
  }

  @override
  Future<CategoryResponseModel> updateCategory(
    String id,
    UpdateCategoryDto dto,
  ) async {
    return await categoryService.updateCategory(id, dto);
  }
}
