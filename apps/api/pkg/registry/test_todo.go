package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/testtodorepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTestTodoController() controller.TestTodo {
	repo := testtodorepository.New(r.client)
	u := usecase.NewTestTodoUsecase(repo)

	return controller.NewTestTodoController(u)
}
