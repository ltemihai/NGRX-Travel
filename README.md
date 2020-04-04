# NGRX-Travel
This is a starter project that exemplifies the using of ngrx for a travel app

# Requirements
Angular CLI  
Node v12.16.1

# Usage
You just need to git clone and run npm install

# How to read the code and understand it
To understand the code, better first read the documentation from ngrx https://ngrx.io/guide/store  
You can find there an idea and a diagram to understand the entire workflow.

As you want to build the state management, you might need to follow the next steps:

**1.) Install**  
First you need to install ngrx. In this project is already added so npm install will install it for you.  
If you start a new project or you don't have it in your existing project, just run the next commands:
```
npm install @ngrx/store
npm install @ngrx/effects
```

**2.) Add store to module**   
Add the store to your app.module.ts. This will add the store mechanism to you root module
```
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}), ///here
    EffectsModule.forRoot([]), ///and here
    ...
  ]
```

**3.) Create store structure**  
Create a folder called store, containing the folder actions, effects and reducers.  
It's easier to maintain what's related to store in a store folder.

**4.) Actions**  
Create an actions file in actions folder. In our example: destinations.actions.ts. Here you will define your actions.  
Actions are unique events. It requires a string key and optionally, a payload which can be an object.  
For each event, usually you need to define a success or a failed action.  
```
export const loadDestinations = createAction(
    '[Destinations] Load Destinations'
);

export const loadDestinationsSuccess = createAction(
    '[Destinations] Load Destinations Success',
    props<{ data: IDestination[] }>()
);

export const loadDestinationsFailed = createAction(
    '[Destinations] Load Destinations Failure',
    props<{ error: any }>()
);
```

**5.) Reducer**  
Create a reducer file in reducer folder. In our example: destinations.reducer.ts  
Reducer handles all the transitions from one state to another.  
Here you have to define a reducer key, a state interface to force strong typing and declare an initial state and the reducer  
By creating reducer, you listen to actions in your app and you will modify the state as your events comes in.  
```
export interface DestinationsState {
    destinations: IDestination[];
    destination: IDestination;
    isDestinationLoading: boolean;
    isDestinationAdding: boolean
    isDestinationAdded: boolean;
    error: any;
}

export const initialState: DestinationsState = {
    destinations: [],
    destination: null,
    isDestinationLoading: false,
    isDestinationAdding: false,
    isDestinationAdded: false,
    error: null
};

const destinationsReducer = createReducer(
    initialState,
    on(destinationActions.loadDestinations, state => ({
        ...state,
        destinations: [],
        isDestinationLoading: true
    })),
    on(destinationActions.loadDestinationsSuccess, (state, {data}) => ({
        ...state,
        destinations: data,
        isDestinationLoading: false,
    })),
    on(destinationActions.loadDestinationsFailed, (state, {error}) =>({
        ...state,
        isDestinationLoading: error,
        error: error
    })),
)

export function reducer(state: DestinationsState, action: Action) {
    return destinationsReducer(state, action);
}

```

**6.) Effects**  
If you need to execute some code at event triggering, you need effects. For that, create a effects file in effects folder. In our case: destinations.effects.ts  
In this case, when we have the loadDestinations event, we want to make a http call to get the list of destinations.
```
export class DestinationsEffects {
 constructor(
        private actions$: Actions,
        private destinationsService: DestinationsService
    ) {}

    loadDestinations$ = createEffect(() => this.actions$.pipe(
        ofType(destinationsActions.loadDestinations),
        mergeMap(() => this.destinationsService.getAllDestinations()
            .pipe(
                map((destinations: any) => destinationsActions.loadDestinationsSuccess({data: destinations})),
                catchError(error => of(destinationsActions.loadDestinationsFailed({error})))
            ))
        )
    );}
}
```


**7.) Selectors**  
Create an index.ts file in store folder. Here you will define the selectors.  
With the selectors, you get only the parts you need from store when they modified. Think of them as queries

```
export const getDestinations = createSelector(selectDestinationsState, (state: DestinationsState) => state.destinations);
```

**8.) Update module**  
After we have actions, reducers, selectors and effects, we have to add them to the module.  
In this project, I've defined a new module to be used with lazy loading, so the import will be like this.
```
        StoreModule.forFeature(fromDestinations.DESTINATIONS_REDUCER_KEY, fromDestinations.reducer),
        EffectsModule.forFeature([DestinationsEffects]),
```
If you don't use lazy loading, you need to add reducer and effects in app.module.

