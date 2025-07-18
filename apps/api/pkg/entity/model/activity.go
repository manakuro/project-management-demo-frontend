package model

import (
	"time"
)

// Activity is the model entity for the TaskActivity and WorkspaceActivity.
type Activity struct {
	ID        ID        `json:"id,omitempty"`
	Type      string    `json:"type,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

// ActivityWhereInput represents a where input for filtering queries.
type ActivityWhereInput struct {
	WorkspaceID ID `json:"workspaceId,omitempty"`
}
