package deletedtaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type deletedTaskRepository struct {
	client *ent.Client
}

// New generates deletedTask repository.
func New(client *ent.Client) ur.DeletedTask {
	return &deletedTaskRepository{client: client}
}
