package teammatetasksectionrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateTaskSectionRepository struct {
	client *ent.Client
}

// New generates teammateTaskSection repository.
func New(client *ent.Client) ur.TeammateTaskSection {
	return &teammateTaskSectionRepository{client: client}
}
