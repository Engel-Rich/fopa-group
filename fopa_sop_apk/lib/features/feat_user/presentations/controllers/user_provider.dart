import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/create_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/list_users_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/sing_out_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/update_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/delete_user_usecase.dart';
import 'package:get_it/get_it.dart';

class UserProvider extends ChangeNotifier {
  final CreateUserUseCase createUserUseCase;
  final ListUsersUseCase listUsersUseCase;
  final UpdateUserUseCase updateUserUseCase;
  final DeleteUserUseCase deleteUserUseCase;
  // final SingOutUsecase singOutUsecase;

  AppState<UserResponseModel> createUserState = AppState();
  AppState<List<UserResponseModel>> listUsersState = AppState();
  AppState<UserResponseModel> updateUserState = AppState();
  AppState<void> deleteUserState = AppState();

  UserProvider({
    required this.createUserUseCase,
    required this.listUsersUseCase,
    required this.updateUserUseCase,
    required this.deleteUserUseCase,
    // required this.singOutUsecase,
  });

  Future<void> createUser(CreateUserDto dto) async {
    createUserState = AppState.loading();
    notifyListeners();

    createUserState = await createUserUseCase.call(dto);
    listUsers();
    notifyListeners();
  }

  Future<void> listUsers() async {
    listUsersState = AppState.loading();
    notifyListeners();

    listUsersState = await listUsersUseCase.call();
    notifyListeners();
  }

  Future<void> updateUser(String id, UpdateUserDto dto) async {
    updateUserState = AppState.loading();
    notifyListeners();

    updateUserState = await updateUserUseCase.call(id, dto);
    listUsers();
    notifyListeners();
  }

  Future<void> deleteUser(String id) async {
    deleteUserState = AppState.loading();
    notifyListeners();

    deleteUserState = await deleteUserUseCase.call(id);
    notifyListeners();
  }

  // Future<void> logout() async {
  //   logoutState = AppState.loading();
  //   notifyListeners();
  //   logoutState = await singOutUsecase.call();
  //   GetIt.instance<LocalStorageService>().logoutUser();
  // }
}
