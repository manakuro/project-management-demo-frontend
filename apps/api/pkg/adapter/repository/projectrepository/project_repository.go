package projectrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectRepository struct {
	client *ent.Client
}

// New generates project repository.
func New(client *ent.Client) ur.Project {
	return &projectRepository{client: client}
}
