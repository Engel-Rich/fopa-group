import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/repositories/category_repository.dart';

class ListCategoriesUseCase {
  final CategoryRepository categoryRepository;

  ListCategoriesUseCase(this.categoryRepository);

  Future<AppState<List<CategoryResponseModel>>> call() async {
    try {
      final response = await categoryRepository.listCategories();
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
