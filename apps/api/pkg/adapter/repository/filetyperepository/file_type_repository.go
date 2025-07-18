package filetyperepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type fileTypeRepository struct {
	client *ent.Client
}

// New generates fileType repository.
func New(client *ent.Client) ur.FileType {
	return &fileTypeRepository{client: client}
}
