## High level objective:

Design and implement a component for visualizing events on a timeline.

## Details:

Your timeline layout should arrange events in a compact space-efficient way: generally speaking, if event A ends before event B starts, the bars for those events can share the same horizontal lane, instead of existing on separate lanes. You may want to slightly relax this constraint to fit in the name of the event (for example, if the event's bar is too short, or the event's name is too long).

The input to the component should be an array of events, where each event has a name, start date, and end date.

The start and end dates will be formatted as YYYY-MM-DD date strings, for example: “2018-12-23”. You don't need to worry about hours, minutes, seconds, or time zones.

You can assume every event's end date is the same or later than its start date.

Avoid using libraries that solve too much of the problem. General purpose libraries like React are definitely okay, but a library that calculates the layout for a timeline is not, for example. This also applies to the CSS Grid `grid-auto-flow` property (but you may use CSS Grid for positioning).

After you have a basic read-only timeline showing up, here are some potential improvements to attempt:

* Allow zooming in and out of the timeline.
* Allow dragging and dropping to change the start date and/or end date for an event.
* Allow editing the name of events inline.
* Any other polish or useful enhancements you can think of.

Include a README that covers:

* How long you spent on the assignment.
* What you like about your implementation.
* What you would change if you were going to do it again.
* How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
* How you would test this if you had more time.

If you did not use the starter code, please also include instructions on how to build and run your project so we can see and interact with the timeline component you built. It should render the sample data included in "src/timelineItems.js"

What we're looking for:

* Clean, readable, maintainable code.
* A sensible user experience and design for the final product.

## Starter code:

To use the starter code: navigate to this project directory, run `npm install` to install dependencies (this takes a couple minutes), and then run `npm start` to initialize and connect to a node server with your default browser. Please feel free to use as much or as little of the starter code as you'd like.

## Sample data:

The "src/timelineItems.js" file has some sample data you can use to get started.
