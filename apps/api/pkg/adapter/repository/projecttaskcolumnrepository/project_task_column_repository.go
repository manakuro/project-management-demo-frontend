package projecttaskcolumnrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectTaskColumnRepository struct {
	client *ent.Client
}

// New generates projectTaskColumn repository.
func New(client *ent.Client) ur.ProjectTaskColumn {
	return &projectTaskColumnRepository{client: client}
}
