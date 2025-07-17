package teammatetaskcolumnrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateTaskColumnRepository struct {
	client *ent.Client
}

// New generates teammateTaskColumn repository.
func New(client *ent.Client) ur.TeammateTaskColumn {
	return &teammateTaskColumnRepository{client: client}
}
