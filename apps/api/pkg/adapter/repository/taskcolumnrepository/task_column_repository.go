package taskcolumnrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskColumnRepository struct {
	client *ent.Client
}

// New generates taskColumn repository.
func New(client *ent.Client) ur.TaskColumn {
	return &taskColumnRepository{client: client}
}
