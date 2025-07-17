package teammatetaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateTaskRepository struct {
	client *ent.Client
}

// New generates teammateTask repository.
func New(client *ent.Client) ur.TeammateTask {
	return &teammateTaskRepository{client: client}
}
