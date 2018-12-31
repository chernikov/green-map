import { trigger, transition, group, query, style, animate, state } from '@angular/animations';

export const RouterSlideAnimation = trigger('routerSlideAnimation', [
    transition('1 => 2', [
        style({ height: '!' }),
        state(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        group([
            query(':leave', [
                animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            ]),
            query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ]),
    ]),
    transition('2 => 1', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        group([
            query(':leave', [
                animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            ]),
            query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ]),
    ]),
]);

/* export const ShakeAnimation = trigger('shake', [
    state('unchecked', style({})),
    state('invalid', style({})),
    transition('unchecked => invalid', [
        animate('400ms ease-in-out', keyframes([
            style({transform: 'translateX(0)'}),
            style({transform: 'translateX(-6px) rotateY(-5deg)'}),
            style({transform: 'translateX(5px) rotateY(4deg)'}),
            style({transform: 'translateX(-3px) rotateY(-2deg)'}),
            style({transform: 'translateX(2px) rotateY(1deg)'}),
            style({transform: 'translateX(0)'})
        ]))
    ])
]);

export const PopupAnimation = trigger('popup', [
    state('show', style({ display: 'block', transform: 'translateY(20px)', opacity: 1 })),
    state('hide', style({ display: 'none', transform: 'translateY(0)', opacity: 0 })),
    transition('show <=> hide', animate('300ms ease-in-out'))
]);

export const SlideAnimation = trigger('slide', [
    state('open', style({ height: '*', opacity: 1, overflow: 'visible' })),
    state('close', style({ height: 0, opacity: 0, overflow: 'hidden' })),
    transition('open <=> close', animate('300ms ease-in-out'))
]);

export const IfSlideAnimation = trigger('if-slide', [
    transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-in-out')
    ]),
    transition(':leave', [
        animate('300ms ease-in-out', style({ height: 0, opacity: 0, overflow: 'hidden' }))
    ])
]);

export const SlidebarAnimation = trigger('sidebar', [
    state('open', style({ right: 0 })),
    state('close', style({ right: '-320px' })),
    transition('open <=> close', animate('300ms ease-in-out'))
]); */