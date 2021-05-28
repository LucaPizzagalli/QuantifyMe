# QuantifyMe

quantifyme.app

## How to use

Just go to quantifyme.app

## How to develop

If you want to compile in local with node:

    yarn start

To production build

    yarn build

To analyze bundle size

    yarn analyze

To upload

    cd upload
    export GOOGLE_APPLICATION_CREDENTIALS="QuantifyMe-01b128cb6517.json"
    python3 upload.py

## TODO / Ideas

Just the remember the two core features: Easy to log, rewarding to log. In second place nice and useful visualizations/analysis

I should also remember to limit the choice block, for example the reddit fit wiki has a ton of possible workout to follow, and I easily get trapped in the choice paradox. One way out is to propose only the first, and later an option to say that you failed, and you one another option. One other way is to ask some questions in advance, and the decision about what to propose is up to me.

### To do list

- How?

### Notes

- How?

### Clocks

- Finish visualization
- Connect timers with logs: for example you set a timer while you study and in the end it logs the hours studied metrics.

### Metrics

- Add pre-made metrics that you can choose
- what about recurrent but not daily stuff?
- add good/bad metric option
- add image upload (an image to remember your day)
- add video upload (maybe like the one-second-day)
- make the checkbox metric. It's a lot of checkbox, that you can toggle or not

### Goals

- How?

### Motivational stuff

- How?

### Smart-devices

- How?

### Quantify day

- Do some automatic autocomplete
  - day: ok
  - position: should be easy, just use the gps (and maybe the last logged day, if the gps is the same use the same description) maybe integration with https://www.google.com/maps/timeline
- Find out how to only partially update the daily report
- How to make it more engaging?
  - Tell some interesting info about what it just logged
    - It’s your first/10th/50th/100th/500th/1000th log
    - It’s your max some metric
    - It’s your min some metric
    - I’s your longest steak of logging
    - That was the longest steak of not logging
- add a "not fancy" way to insert data option, that you can toggle from the setting, to fill the data as in a form
- add possibility to log data by talking to the phone. you talk and it understands what metric to fill

### Panic Button

When you just want to procrastinate you press this button. It lets you procrastinate very fast, bat thing starts to get ugly pretty fast. The viewport shrink, the page slows, timers go up, popup, sounds, whatever you want

- How? viewport are blocked by many many websites

### Stats

- finish the bubble/correlation chart
- what about a word chart with the frequency of words for each text metric?
- how to auto-find most correlated metrics?
- Packed bubbles are cool, can I use it somehow?
- Maybe I can do something with the chart synchronization offered by highchart
- Oh my god, play the chart as music, that's cool
- maybe add something like the commit frequency plot from github?
- treat the logging history (did you log or not) as a metric
- show a map for the places
- integrate a python interpreter, running locally in webassembly. The user can write in a basic editor the code that produces a custom plot

### Dashboard

- Find out how what to add in the dashboard

### Money accounting

- should I?
- How?

### Distribution

- Put it on the play store
- Add some basic analytics

### Marketing

- How?
- hacker-news
- indie-hackers
- quantified-self website
- there probably is a reddit page about startup and one about procrastination/quantified self.
- lol, should I have a blog?

### Gamification

Gamification is splitted in two: one is more explicit and it's about some avatar that progress and gets better; one is more implicit ad it's about the features that you slowly gain while you use the app, this second one is also useful to lower the learning curve.

#### Explicit

In a page there are two guys, one good and one bad. The bad one is a monster/ghost. The monster grows as you don't log and the character grows as you reach your goals. One represents the logging commit the other the other life goals commit.

- maybe I can change the whole app colors if something is getting low
- character could be a tree

#### Implicit

In the beginning there are only a few few options about what to do. As the user uses the app the options increase.
The first time an option is opened a text (with some graphic) explains the functionality, later this guide is viewable pressing something

Levels:

  1. 1 metric, quantify day
  2. 2 metrics, see diary
  3. 3 metrics, oo alarm, see avatar
  4. oo timers and stopwatch, see stats
  5. 4 metrics, see life calendar

### Registration / Authentication

- keep an eye on the the lighter release of firebase
- from the landing page it lets you start using the app with an anonymous account, there is a bar up

### Landing Page

- How?
- "Your future self will thank you"

### Life Calendar

- add something to zoom in/out
- color the weeks based on some metric
- add Events to the calendar (personal and about the world)

### Others

- Study more service worker
- can I legally use highchart without the link? probably yes
- should I put a cookie banner? probably not
- should it be open source?
- client-side encrypted? probably yes
- put a cache between firestore and teh user object, and read stuff from the db only the first time (or use a existing solution from firebase)

### Competitors / Inspirations

- <https://todoist.com/> : looks like just a to do list with notifications and little stats
- <https://getpocket.com/> : some kind of keeping track of what you hace to read
- <https://www.rescuetime.com> : like activity watcher
- <https://toggl.com/> : for what I understand is more enterprise focused, it's a project tracker. Differently from my metrics, projects come and go easly, start and finish. I should think about this
- <https://www.youneedabudget.com/> : money
- <https://mint.intuit.com/> : money
- <https://www.marcus.com/us/en/clarity-money> : money
- <https://www.myfitnesspal.com/> : fitness
