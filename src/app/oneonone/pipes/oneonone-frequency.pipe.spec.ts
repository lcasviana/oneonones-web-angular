import { TestBed } from '@angular/core/testing';
import { OneononeFrequencyPipe } from './oneonone-frequency.pipe';

describe('OneononeFrequencyPipe', () => {
  let pipe: OneononeFrequencyPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneononeFrequencyPipe]
    }).compileComponents();
    pipe = new OneononeFrequencyPipe();
  });

  it('transform 7 into Weekly', () => {
    const value = 7;
    const description = pipe.transform(value);
    expect(description).toBe('Weekly');
  });
});