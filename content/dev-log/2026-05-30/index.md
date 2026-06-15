---
date: 2026-05-30 12:00:00-08:00
title: 2026 May 30
---

- To do list
	- Test assumption about rebalancing launch adapter leading to less friction on launch sled/channel.
	- Redesign launch adapter.
	- Rebuild fuselage. Fix balancing in fuselage.
	- Resolder ESC outputs.
	- Testing launching from the ground with no power.
	- Try with power and adjust.
- Things
	- Hmm, I think the plane is pitching up on launch not because of the tail incline (there's barely any airflow initially at launch!), but because the force is being applied behind the center of gravity. I should devise another solution for this.
	- Hmm actually it's a mix. It's both behind the center of gravity, and it's pushing from the bottom and not enough from the top (of the fuselage). If either was changed, it should go straight. Going to do a mix of both. Move the push point forward (helps with the balancing anyway), and increase the height on my launch adapter.
	- This launcher is a little harder than I thought. So my hypothesis about the center of gravity vs. pushing from the bottom is not totally correct it seems. There's the center of gravity, but there's also the center of mass. Center of gravity here really just influences whether your aircraft will tilt while idle on the launcher. Center of mass relative to where the force is applied will tell you how much it will rotate from launch. Extreme example: if you have a baseball and attach a stick to the bottom, applying force anywhere on the stick will rotate the ball, regardless of where you apply relative to the center of gravity. You will only move the whole thing forward and not rotate if you apply your horizontal force at the center of mass relative to the y-axis (assuming it's symmetrical in the z-axis). Looking back this feels obvious. And this is the reason why my original glider had the same tendency to pitch up then nosedive when I originally tested by launcher. This is a breakthrough.
	- How can I fix this...? It'd be nice to launch by pushing the wings, but the tail will get caught on there. I wonder if it will be enough to just push on an attachment higher up on the fuselage.
	- Examples of results with lower then higher points of applied force:
	- <video controls width="100%">
  <source src="launcher_slow_pitch_more.mp4" type="video/mp4">
</video>
	- <video controls width="100%">
  <source src="launcher_slow_pitch_less.mp4" type="video/mp4">
</video>
	- On the first one you can see the tail literally slap my finger and bounce a little. The second one I increased the height of the launch adapter and it doesn't hit my finger but it still gets pitched up a little.

