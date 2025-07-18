package taskcollaboratorrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskCollaboratorRepository struct {
	client *ent.Client
}

// New generates taskCollaborator repository.
func New(client *ent.Client) ur.TaskCollaborator {
	return &taskCollaboratorRepository{client: client}
}
