package testtodorepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type testTodoRepository struct {
	client *ent.Client
}

// New generates testTodo repository.
func New(client *ent.Client) ur.TestTodo {
	return &testTodoRepository{client: client}
}
