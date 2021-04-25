import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import { Context } from '../../interfaces/context/context';
import { NavState } from '../../enums/nav-state';

import { ContextService } from '../../services/context/context.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Context component
 */
@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent {
  /** Context. */
  @Input() public context!: Context;

  /** Context caption */
  @Input() public caption = '';

  /** Context tooltip title */
  @Input() public title = '';

  /** Tab clickable element. */
  @ViewChild('clickableTab') clickableTab!: ElementRef<HTMLElement>;

  /** Input element. */
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  /** Delete clickable element. */
  @ViewChild('clickableDelete') clickableDelete!: ElementRef<HTMLSpanElement>;

  /** Nav state enum accessor. */
  public readonly NavState = NavState;

  /* Contexts getter delegate. */
  public get contexts() { return this.contextService.contexts; }
  /* Contexts setter delegate. */
  public set contexts(value: Context[]) { this.contextService.contexts = value; }

  /** Selected context getter delegate. */
  public get selectedContext() { return this.contextService.selectedContext; }
  /** Selected context setter delegate. */
  public set selectedContext(value: Context | undefined) { this.contextService.selectedContext = value; }

  /** Whether context switcher is in editing mode getter delegate. */
  public get isEditing() { return this.contextService.isEditing; }
  /** Whether context switcher is in editing mode setter delegate. */
  public set isEditing(value: boolean) { this.contextService.isEditing = value; }

  /** Nav state getter delegate. */
  public get navState() { return this.contextService.navState; }

  /**
   * Constructs the context component.
   *
   * @param contextService The context service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly contextService: ContextService,
    public readonly uiService: UiService,
    public readonly inputService: InputService,
    public readonly persistenceService: PersistenceService,
  ) { }

  /** On context selection event handler */
  // eslint-disable-next-line max-lines-per-function, complexity
  public onSelect(event: MouseEvent, item: Context): void {
    event.stopPropagation();
    if (this.navState === NavState.Open && this.contextEquals(item, this.selectedContext)) {
      // if (item.id === 0) {
      //   // add new context to collection
      //   item.id = this.nextId();
      // }

      // version the selected context first
      this.new();

      // start editing
      this.isEditing = true;
    } else {
      // change context
      this.selectedContext = item;

      // respond to event
      if (!this.isEditing) {
        // refresh
        this.uiService.uiInvalidated$.emit(true);
      }
    }

    // focus
    if (this.isEditing) {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    }
  }

  /** On context deletion event handler */
  public onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.delete(this.selectedContext);
    this.selectedContext = undefined;
    // this.stopEditing();
  }

  /** Replicate context */
  private get newContext() {
    const context = this.selectedContext;

    // const newId = context?.id ?? 0;
    const newId = this.nextId();
    const newName = context?.name ?? '';
    // const { contexts, selectedContext, navState, ...serializabeStorage } = this.persistenceService.storage.storage;
    const newStorage = context?.storage ?? {} as Storage;

    const newContext: Context = { id: newId, name: newName, storage: newStorage };
    // this.edit(newContext, newContext);

    return newContext;
  }

  /** Next id for new contexts */
  private nextId() {
    return Math.max(...this.contexts.map((_) => _.id)) + 1;
  }

  /** Context comparer delegate. */
  public contextEquals(context1?: Context, context2?: Context) { return this.contextService.contextEquals(context1, context2); }

  /** Add new context */
  private new() {
    const contexts = this.contexts;
    contexts.push(this.newContext);
    this.contexts = contexts;
    // this.persistenceService.setItem(this.contextsPersistenceKey, JSON.stringify(this.contexts));
  }

  /** Delete context */
  private delete(context?: Context) {
    if (context) {
      this.contexts = this.contexts.filter((_) => _.id !== context.id);
    }
  }
}
