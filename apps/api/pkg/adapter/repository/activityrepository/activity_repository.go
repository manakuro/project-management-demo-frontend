package activityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type activityRepository struct {
	client *ent.Client
}

// New generates teammate repository
func New(client *ent.Client) ur.Activity {
	return &activityRepository{client: client}
}
