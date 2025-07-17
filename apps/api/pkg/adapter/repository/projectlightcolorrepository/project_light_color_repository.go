package projectlightcolorrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectLightColorRepository struct {
	client *ent.Client
}

// New generates projectLightColor repository.
func New(client *ent.Client) ur.ProjectLightColor {
	return &projectLightColorRepository{client: client}
}
