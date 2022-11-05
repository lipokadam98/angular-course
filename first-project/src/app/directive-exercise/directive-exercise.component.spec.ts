import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveExerciseComponent } from './directive-exercise.component';

describe('DirectiveExerciseComponent', () => {
  let component: DirectiveExerciseComponent;
  let fixture: ComponentFixture<DirectiveExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectiveExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectiveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
