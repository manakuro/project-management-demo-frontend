package archivedactivityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type archivedActivityRepository struct {
	client *ent.Client
}

// New generates teammate repository
func New(client *ent.Client) ur.ArchivedActivity {
	return &archivedActivityRepository{client: client}
}
