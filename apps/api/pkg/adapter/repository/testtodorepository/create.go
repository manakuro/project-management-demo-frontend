package testtodorepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *testTodoRepository) Create(ctx context.Context, input model.CreateTestTodoInput) (*model.TestTodo, error) {
	res, err := r.client.
		TestTodo.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
