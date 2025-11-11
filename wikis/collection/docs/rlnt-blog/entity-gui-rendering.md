# Rendering entities in a GUI

-   Blog Entry 1
-   2025-11-10

> A painful experience turned into a learning opportunity. I want to share my journey, hoping it helps others avoid the pitfalls I encountered.

Links:

-   [Discord]
-   [Almost Reliable GitHub][ar-github]
-   [Author GitHub][author-github]
-   [Summoning Rituals GitHub][sr-github]

> [!WARNING] NOTE
> This blog post shows code snippets of Minecraft and other Minecraft mods. All code is the property of their respective owners. This blog post is for educational purposes only and is not affiliated with Mojang or Microsoft in any way.

## Introduction

In this blog post, I will discuss the challenges and solutions I encountered while rendering entities in a GUI for my Minecraft mod.
My name is [rlnt also known as Relentless][author-github]. I am a mod developer for over 10 years now. Within the organization
[Almost Reliable][ar-github], we primarily develop utility mods for pack developers, a lot of
[KubeJS]-related mods and every so often a little content mod.

This post is aimed at fellow mod developers who may be facing similar challenges. If if you are new to modding or have limited experience
or even if you are just curious about the technical aspects of Minecraft modding, I hope you will find this post informative and engaging.
This may help players understand the effort and challenges around creating mods and why it sometimes takes longer than expected to implement certain features.

I personally have little understanding of OpenGL, the technology behind Minecraft's graphics. Most of what I know is based on trial and
error, reading existing code, and learning from others over the years. Rendering is a very mathematical concept. Most of the following
content will cover vectors and matrices. I am no mathematician either, but school math and a good understanding of 3D space should be
enough to grasp the concepts.

I will try to use little technical jargon and explain concepts in a way that is accessible to a broad audience. The screenshots and code
snippets will help illustrate the points I make throughout this post.

## Challenge

Rendering entities within a GUI in Minecraft can have different use-cases. In my instance, I wanted to develop a
[Just Enough Items][jei] (JEI) plugin for my mod
[Summoning Rituals][sr-github] (SR). SR is a mod that allows pack developers to create custom
recipes offering item and entity inputs, as well as item, entity, and command outputs. Additionally, pack devs can attach many different
conditions to these recipes and even customize them further via events.

To display a recipe to a player, a mod developer typically adds integration for so called recipe viewer mods. Since JEI is the most
popular one, I wanted to start out by adding support for that. SR already existed in versions prior to 1.21.1 and had working JEI support
already. The entity renderer was rather basic, though.

The biggest challenge when rendering entities is that Minecraft doesn't expose their actual sizes. The only available information is
their bounding box, which doesn't always accurately represent their visual size. Think about the Ghast for example. The tentacles aren't
included in the bounding box, leading to a misleadingly small representation if you render it based on that. Another challenge is the
height offset. On the one hand some entities are aligned on the Y-axis plane, meaning they sit right on the ground. Others, on the other
hand, start below that or hover somewhere above it.

The main question is how to determine the correct scale and offset for each entity to ensure they are displayed properly within the GUI.
How do you work around the limitation of only knowing the bounding box? How do you handle entities with unique models or animations?

> [!INFO] NOTE
> Although this blog post primarily focuses on rendering entities in a JEI GUI, the concepts and techniques discussed can be applied to any other GUI context where entities need to be displayed.

## Start

To understand how to render entities in a GUI, it's essential to grasp the basics of JEI integration and the role of custom ingredient
renderers. They act as the entry point for all the rendering logic.

### JEI integration basics

To display recipes in a recipe viewer like JEI, many steps are involved. First, you need to create a custom plugin, a recipe category,
you need to register your additions, and more. All of that is out of scope for this blog post.

I already implemented a basic display category for my SR recipe that shows the item inputs and outputs. All inputs are aligned in a circle
around the altar block in the center. Above the altar block is the catalyst needed to start the ritual. The items at the bottom represent
the outputs of the ritual.

<img src="/../img/starting-point.png" class="center" width="600">

To support entity displays within this category, a custom ingredient type is required. The most important information you need is that
each custom ingredient type requires a custom renderer. A renderer is responsible to render a single ingredient in the GUI. That includes
the bookmarks you can set, as well as the different item slots within the recipe.
In this case, that ingredient is an entity.

Basic implementations of an entity ingredient and the ingredient renderer look as follows.

::: code-group

```java [EntityIngredient.java]
public final class EntityIngredient {

    // Holder<EntityType<?>> is a raw definition of the entity that is used to create
    // an actual instance of the entity in the current world
    private final Holder<EntityType<?>> entityType;
    @Nullable private Entity entity;

    public EntityIngredient(Holder<EntityType<?>> entityType) {
        this.entityType = entityType;
        var level = Minecraft.getInstance().level;
        if (level != null) {
            this.entity = entityType.value().create(level);
        }
    }

    @Nullable
    public Entity getEntity() {
        return entity;
    }
}
```

```java [EntityIngredientRenderer.java]
public final class EntityIngredientRenderer implements IIngredientRenderer<EntityIngredient> {

    @Override
    public void render(GuiGraphics guiGraphics, EntityIngredient entityIngredient) {
        // rendering logic here
    }

    @Override
    public List<Component> getTooltip(EntityIngredient entity, TooltipFlag tooltipFlag) {
        // tooltip logic here
    }
}
```

:::

#### Entity Ingredient

The `EntityIngredient` receives a `Holder<EntityType<?>>`, which is a raw definition of the entity that is used to create an actual
instance of the entity in the current world. Upon initialization, it attempts to create the entity using the provided `EntityType` and
stores it for later use. It's exposing the created entity via a getter method.

#### Entity Ingredient Renderer

The `EntityIngredientRenderer` implements the `IIngredientRenderer` interface provided by JEI. It is responsible for rendering the
`EntityIngredient` within the GUI. The `render` method is where the actual rendering logic takes place. The ingredient, as well as the
renderer, need to be registered within the JEI plugin for them to be used.

The `render` method will pass an instance of the `EntityIngredient`, which allows access to the underlying entity that needs to be
rendered. `GuiGraphics` is a helper class provided by Minecraft, more about that later.

### Initial Approach

The common approach to a new concept in Minecraft modding is to look at how vanilla does it. In case you never heard it, "Vanilla" refers
to the unmodified version of Minecraft, as released by Mojang. This blog post has been written at the time of Minecraft 1.21.1,
right after [Mojang announced they will remove obfuscation in future versions][obfuscation-article].
This means learning from vanilla code will become much
easier in the future. For now, we still need to rely on decompiled code and mappings provided by the community, which makes the process
a bit harder.

First, you always have to ask yourself: Where does Vanilla use similar functionality?<br>
In this case, I remembered that Minecraft needs to render an entity in the inventory screen. The player is nothing more than an entity.
That means the same concept can be applied for other entities as well.

After a bit of investigation, I found the relevant code in the `InventoryScreen` class. The method `renderEntityInInventory` shows
everything I need to know about rendering an entity in the GUI. Because of its length and the license, I won't include the full code
in this blog post. The relevant parts are as follows.

```java:line-numbers
Lighting.setupForEntityInInventory();
EntityRenderDispatcher renderDispatcher = Minecraft.getInstance().getEntityRenderDispatcher();
if (cameraOrientation != null) {
    entityrenderdispatcher.overrideCameraOrientation(
        cameraOrientation.conjugate(new Quaternionf()).rotateY((float) Math.PI)
    );
}

entityrenderdispatcher.setRenderShadow(false);
RenderSystem.runAsFancy(
    () -> renderDispatcher.render(
        entity,
        0.0, 0.0, 0.0,
        0.0F, 1.0F,
        guiGraphics.pose(), guiGraphics.bufferSource(),
        15728880
    )
);
guiGraphics.flush();
entityrenderdispatcher.setRenderShadow(true);
Lighting.setupFor3DItems();
```

Now, let's break down the code step by step.

1. **Lighting Setup** (line 1):<br>
   The first line sets up the lighting conditions suitable for rendering entities in an inventory context. This ensures that the entity appears well-lit and visually appealing.
2. **Entity Render Dispatcher** (line 2):<br>
   The `EntityRenderDispatcher` is obtained from the Minecraft instance. This dispatcher is responsible for managing the rendering of entities in the game.
3. **Camera Orientation** (lines 3-7):<br>
   If a specific camera orientation is provided, it overrides the default camera orientation to ensure the entity is rendered from the desired angle. Vanilla uses this to rotate the player model based on mouse movement.
4. **Shadow Rendering** (line 9):<br>
   Shadow rendering is temporarily disabled to prevent shadows from affecting the appearance of the entity in the GUI.
5. **Rendering Execution** (lines 10-18):<br>
   The actual rendering of the entity is performed within a `RenderSystem.runAsFancy` block. This block ensures that the rendering adjusts to quality settings set by the user in the Minecraft options menu. The `render` method of the `EntityRenderDispatcher` is called with the entity and various parameters, including position, rotation, and lighting information.
6. **Buffer Flushing** (line 19):<br>
   After rendering, the graphics buffer is flushed to ensure that all rendering commands are executed and the entity is displayed correctly.
7. **Restoring Rendering** (lines 20-21):<br>
   Finally, shadow rendering and light setup are re-enabled to restore the original rendering state for subsequent operations.

After seeing the vanilla implementation, it was time to implement a first approach in my own renderer. I decided to keep the logic the
same. Because I don't need the entities to follow the mouse movement, I skipped the camera orientation part. The rest is more or less
the same as in vanilla.

<a id="initial-approach-code"></a>

```java
@Override
public void render(GuiGraphics guiGraphics, EntityIngredient entityIngredient) {
    if (!(entityIngredient.getEntity() instanceof LivingEntity entity)) {
        // don't render the entity if it's null or not a living entity
        return;
    }

    var poseStack = guiGraphics.pose();
    poseStack.pushPose();
    {
        Lighting.setupForEntityInInventory();
        var entityRenderer = Minecraft.getInstance().getEntityRenderDispatcher();
        entityRenderer.setRenderShadow(false);
        RenderSystem.enableBlend();

        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, guiGraphics.pose(), guiGraphics.bufferSource(),
            LightTexture.FULL_BRIGHT
        ));
        guiGraphics.flush();

        entityRenderer.setRenderShadow(true);
        Lighting.setupFor3DItems();
    }
    poseStack.popPose();
```

The implementation follows the vanilla example closely. There are a few more steps involved. Before any rendering, I am checking if the
entity does even exist and if it's a `LivingEntity`. This includes all mobs. Non-living entities like item frames or boats are not
supported because I have no use-case for that. The logic uses an `instanceof` cast, which means if the condition is true, the `entity`
variable will automatically be cast to `LivingEntity` which is non-nullable.

Another new step is involved. Previously, I mentioned that we will need to talk about `GuiGraphics`. `GuiGraphics` is a helper class
provided by Minecraft that simplifies rendering operations within GUIs. It provides access to something called a `PoseStack`.

Via `guiGraphics.pose()`, I can access the underlying `PoseStack`, which is a stack-based structure used to manage transformations (translation, rotation, scaling). The `PoseStack` is a core concept of Minecraft's rendering system. A `PoseStack` is essentially a stack
of transformation matrices that allows you to apply and manage multiple transformations in a hierarchical manner. In simple terms, it
holds coordinate systems that can be modified and restored as needed.

`pushPose()` pushes a new transformation matrix onto the stack, allowing you to apply transformations without affecting the previous
state. If you are done with your transformation, you can call `popPose()` to revert to the previous state. You might be wondering why I
used a block `{ ... }` after pushing the pose. This is just a coding style I like to use to visually separate the code that is affected
by the pushed pose from the rest. It's completely optional.

With that implemented, the recipe would still look the same as the initial screenshot. The entity ingredients would still need to be
added to the actual category display. To avoid bloating this blog post too much, I won't include that in here. After defining the entity
ingredient slots and assigning the entity ingredients with the custom renderer to them, the recipe would look as follows.

<img src="/../img/first-render.png" class="center" width="600">

Although hard to spot, you can see that the entities are rendered. I used a variety of different entities to see how they would look.
Since the Ghast is a rather large entity, you can see it quite well. That's a good first step. However, a lot of transformation is still
required to make the entities look good.

### Renderer Transformations

As you can see in the screenshot above, the entities are pretty small and upside down. I can't really explain the reason, but this is a
common issue when rendering anything in Minecraft. The same will happen if you try to render a block in a GUI. This is probably related
to how the coordinate system is set up in the 2D space.

One thing I didn't mention when introducing the `PoseStack` is how it can be used to transform the viewport. In its raw form, the
`PoseStack` just hosts a matrix that defines the current coordinate system. By applying transformations to the `PoseStack`, and therefore
to the underlying matrix, you can modify how things are rendered. For example, you can translate (move), rotate, or scale the coordinate
system.

Since the `render` method of the JEI entity renderer already provides an instance of `GuiGraphics` which hosts the `PoseStack`, and the
renderer is called for each slot individually, the underlying matrix is already positioned at the upper-left corner of the slot within
the recipe layout. This is the reason why all entities are rendered in the corner of their respective slots and not in the center.

Typically, in a 2D layer, the axes look as follows.
![](/../img/axes.png)

But since the entities are upside down, it's an indicator that the Y-axis is inverted. This means that positive `y` values go downwards
instead of upwards. We can test this by applying a translation to the matrix on the Y-axis in the positive direction. If the entities move
downwards, our assumption is correct.

| Code                             |                 Before                 |                 After                 |
| -------------------------------- | :------------------------------------: | :-----------------------------------: |
| `poseStack.translate(0, 10, 0);` | ![](/../img/before-transformation.png) | ![](/../img/after-transformation.png) |

The matrix is set up in a way that uses relative coordinates and starts at the slot origin at `0, 0`. It's scaled so that it only
occupies a single pixel of the slot. I needed to transform the matrix in a way that the entities are rendered in the center of the slot
and in their correct direction. For this I applied a rotation of 180° around the Z-axis (depth axis) and translation of half the slot
width and the full slot height on the Y-axis so that the entities are aligned with the bottom center of the slot. I performed the
ranslation before the rotation to ensure the axes are correct. By translating the matrix, we essentially shift the origin position.
A rotation operation will always use the matrix origin as the angle.

In modern game development, rotations are usually transformed by something called quaternions. Quaternions are a mathematical concept
that provides a way to represent rotations in 3D space without suffering from issues like gimbal lock, which can occur with other
rotation representations like Euler angles. Quaternions are a whole different topic and would need a separate blog post. If you want to
learn more about them, I recommend checking [their Wikipedia article][wikipedia-quaternion].

For my purpose, the operation is quite simple and doesn't need a whole lot knowledge about quaternions. Minecraft already provides a lot
of useful helper methods to work with them. `100` is used as the Z-coordinate to ensure the entity is rendered in front of other GUI
elements and doesn't clip into the background (also known as Z-fighting).

```java
private static final int SLOT_SIZE = 16;
// ... inside render method
poseStack.translate(SLOT_SIZE / 2f, SLOT_SIZE, 100);
poseStack.rotate(Axis.ZP.rotationDegrees(180));
```

|                 Before                 |                    After                     |
| :------------------------------------: | :------------------------------------------: |
| ![](/../img/before-transformation.png) | ![](/../img/after-transformation-center.png) |

To see the entities better, I applied a uniform scale of `6.0f` to the matrix as well.

| Code                                 |                    Before                    |             After              |
| ------------------------------------ | :------------------------------------------: | :----------------------------: |
| `poseStack.scale(6.0f, 6.0f, 6.0f);` | ![](/../img/after-transformation-center.png) | ![](/../img/after-scaling.png) |

## Interim Conclusion

The rendering of entities in a GUI is pretty straightforward once you understand how to manipulate the `PoseStack` to achieve the desired
transformations. However, there are many more challenges to tackle.

At first, since each entity has a different size, the uniform scale results in an inconsistent appearance. Large entities will become way
too big for a slot, while small entities are still too small to be recognizable. Additionally, there are some entities that act really
strange. As you can see above, the Bat and the Ender Dragon face in the opposite direction. Furthermore, the Ghast isn't correctly
centered and its tentacles overlap the slot borders.

<img src="/../img/after-scaleing-all.png" class="center" width="600">

After looking at the current state for a while, I realized the entity dispatcher uses the bottom of the bounding box for alignment. This
means the bottom slot border is aligned with the bottom of the bounding box. For most entities, this is fine. But for entities like the
Ghast, whose model extends beyond the bounding box, this leads to visual issues. Since Minecraft offers a way to render bounding boxes in
the game for debugging purposes, it's pretty simple to confirm this assumption.

|            Bat            |            Creeper            |            Wither            |            Ghast            |
| :-----------------------: | :---------------------------: | :--------------------------: | :-------------------------: |
| ![](/../img/bbox-bat.png) | ![](/../img/bbox-creeper.png) | ![](/../img/bbox-wither.png) | ![](/../img/bbox-ghast.png) |

As you can see, bounding boxes in Minecraft are just simple rectangular prisms that encapsulate the entity. They don't account for the
actual model. Most of the time, these bounding boxes act as the hitbox at the same time. This means they define the area where players
can interact with the entity. For some entities, like the Dragon, where the bounding box is extremely huge compared to the model, there
is special logic to handle interactions. The bounding box is still used for rendering, though. You might be wondering where the bounding
box of the Ghast is. Take a look at the following screenshot. As I mentioned earlier, the tentacles aren't part of the bounding box. And
now we can see that even the head is not fully included.

<img src="/../img/bbox-ghast-inner.png" class="center" width="600">

Since the bounding box is the point of alignment, the Ghast appears misaligned in the slot and its tentacles as well as a bit of it head
overlap the slot borders.

## Entity Scaling and Offsetting

To tackle the issues I mentioned above, I needed to find a way to determine the correct scale and offset for each entity. This is where
things got _really_ tricky.

While looking at vanilla code is a good starting point, most modders also take inspiration from other mods. Most of the time, there are
other mods that faced similar challenges and have already implemented solutions. There are a few mods rendering entities in their GUIs as
well. One of the most popular ones is [Just Enough Resources][jer-github], a JEI add-on that
displays additional information about loot drops, loot tables, and more. For the entity loot drops, they display an entity in JEI.

<img src="/../img/jer-preview.png" class="center" width="600">

After a quick look into their codebase, I found the following logic.

```java
private float getScale(LivingEntity livingEntity) {
    float width = livingEntity.getBbWidth();
    float height = livingEntity.getBbHeight();
    if (width <= height) {
        if (height < 0.9) return 50.0F;
        else if (height < 1) return 35.0F;
        else if (height < 1.8) return 33.0F;
        else if (height < 2) return 32.0F;
        else if (height < 3) return 24.0F;
        else if (height < 4) return 20.0F;
        else return 10.0F;
    } else {
        if (width < 1) return 38.0F;
        else if (width < 2) return 27.0F;
        else if (width < 3) return 13.0F;
        else return 9.0F;
    }
}

private int getOffsetY(LivingEntity livingEntity) {
    int offsetY = 0;
    if (livingEntity instanceof Squid) offsetY = 20;
    else if (livingEntity instanceof Turtle) offsetY = 10;
    else if (livingEntity instanceof Witch) offsetY = -5;
    // ... many more entities
    else if (livingEntity instanceof Creeper) offsetY = -15;
    else if (livingEntity instanceof AbstractPiglin) offsetY = -15;
    return offsetY;
}
```

This is a simple but efficient approach to scale and offset entities. However, this only covers most vanilla entities. Custom entities
of other mods won't be supported unless you add proper integration and hardcode their values as well. My goal is to have a future-proof
dynamic solution that works for any entity, including custom ones from other mods.

To start out, I reused logic from older versions of SR. Back then, I used a lot of debugging and Excel to create a spreadsheet of the
different entity sizes and offsets. After that I used an example size, in this case a Creeper, and calculated scale factors for each entity based on that. To have a multiplicative factor, I used the height of the bounding box as a reference.

```java{4-6}
private static final float CREEPER_HEIGHT = 1.7f;
private static final float CREEPER_SCALE = 0.5f;
// ... inside render method
var entityHeight = entity.getBbHeight();
var entityScale = Math.min(CREEPER_HEIGHT / entityHeight, 1f) * 16;
var scaleFactor = CREEPER_SCALE * size * entityScale;
// render logic
```

<img src="/../img/hardcoded-scaling.png" class="center" width="600">

This calculation primarily focuses on the height of the bounding box. Since most entities are taller than they are wide, this approach
is already more dynamic than the previous hardcoded one. However, it still has its flaws. Entities that are wider than they are tall will
be rendered out of bounds. Additionally, since we only rely on the bounding box, entities with models that extend beyond it will still
have visual issues. This implementation also has no offsetting logic, meaning entities like the Ghast will still be misaligned.

### Entity Measuring

The next step was to find a way to retrieve the actual size of an entity. Since Minecraft doesn't expose that information directly, I only
had one idea. Parse the model files of each entity to determine their actual dimensions. This would be really tedious and error-prone, so
I decided to give myself a break and keep using the bounding box for now.

Later that day, after talking on a Discord with some fellow modders, one of them mentioned a new idea to tackle this problem. After
thinking about this approach for some time, I realized this could actually work. I want to give huge shoutouts to [embeddedt] for coming up
with this idea and pitching it to me out of the blue.

<img src="/../img/embeddedt.png" class="center" width="800">

So what does this even mean?

As you could see in previous code snippets, the entity render dispatcher uses something called a `BufferSource` to render entities. A
`BufferSource` is responsible for managing vertices and sending them to the GPU for rendering. But what on earth does "vertices" mean?
Vertices is plural for vertex. A vertex is a point in 3D space that defines the corners of geometric shapes. In 3D graphics, objects are
typically represented as a collection of vertices connected by edges and faces to form polygons, usually triangles. You have probably
heard of this concept before when talking about 3D models or game engines. Explaining this concept in detail would go beyond the scope of
this blog post. The only thing you need to know is that each entity is made up of many vertices that define its shape. This is unrelated
to the bounding box. I am talking about the actual model geometry also known as the render shape or the mesh.

Typically, when working with a `BufferSource`, you obtain a `VertexConsumer` from it by specifying a render type. Minecraft uses a lot
of different render types for different purposes. For example, there are render types for solid objects, translucent objects, cutout
objects, and more. After obtaining the `VertexConsumer`, you can use it to add vertices to the buffer. Each vertex has a position in 3D
space, as well as other attributes like color, texture coordinates, and normals.

The idea [embeddedt] came up with is to create a custom `VertexConsumer` exposed by the `BufferSource` which doesn't actually render
anything. Instead, it only tracks the minimum and maximum coordinates of all vertices added to it. By doing this, we can effectively
measure the actual size of the entity based on its rendered geometry rather than relying on the bounding box. Feel free to check out the
implementation in the following spoiler, it's not required, though. You only need to understand that it allows me to capture the minimum
and maximum vertex positions on each axis. Since I only use it for measuring purposes, it's not required to respect the render type or
other unrelated data like colors or texture coordinates.

:::details Custom Vertex Consumer Implementation

```java
public class MeasuringBufferSource implements MultiBufferSource {

    private final MeasuringVertexConsumer instance = new MeasuringVertexConsumer();

    @Override
    public VertexConsumer getBuffer(RenderType renderType) {
        // return the same consumer for all render layers, we only care about positions
        return instance;
    }

    @Nullable
    public MeasuringResult getData() {
        return instance.data;
    }

    public record MeasuringResult(float minX, float minY, float minZ, float maxX, float maxY, float maxZ) {

        public static final MeasuringResult EMPTY = new MeasuringResult(0, 0, 0, 0, 0, 0);

        MeasuringResult(float x, float y, float z) {
            this(x, y, z, x, y, z);
        }

        MeasuringResult measure(float x, float y, float z) {
            var mMinX = Math.min(minX, x);
            var mMinY = Math.min(minY, y);
            var mMinZ = Math.min(minZ, z);
            var mMaxX = Math.max(maxX, x);
            var mMaxY = Math.max(maxY, y);
            var mMaxZ = Math.max(maxZ, z);
            return new MeasuringResult(mMinX, mMinY, mMinZ, mMaxX, mMaxY, mMaxZ);
        }
    }

    private static final class MeasuringVertexConsumer implements VertexConsumer {

        @Nullable
        private MeasuringResult data;

        private void record(float x, float y, float z) {
            if (data == null) {
                data = new MeasuringResult(x, y, z);
            } else {
                data = data.measure(x, y, z);
            }
        }

        @Override
        public VertexConsumer addVertex(float x, float y, float z) {
            record(x, y, z);
            return this;
        }

        @Override
        public VertexConsumer setColor(int r, int g, int b, int a) {
            return this;
        }

        @Override
        public VertexConsumer setUv(float u, float v) {
            return this;
        }

        @Override
        public VertexConsumer setUv1(int u, int v) {
            return this;
        }

        @Override
        public VertexConsumer setUv2(int u, int v) {
            return this;
        }

        @Override
        public VertexConsumer setOverlay(int overlay) {
            return this;
        }

        @Override
        public VertexConsumer setNormal(float nx, float ny, float nz) {
            return this;
        }
    }

}

```

:::

How does this work in action?

Let's look back at the render implementation in the [Initial Approach section](#initial-approach-code). It uses the `BufferSource`
provided by the `GuiGraphics` to render the entity. Because this handles the actual rendering, I needed to keep it. However, I can
recreate the logic and call it with the custom `MeasuringBufferSource` instead. After that, I can retrieve the measured data from the
it and use it for scaling and offsetting. Combining that with the rotation, slot centering, and the scaling logic of old SR versions,
we end up with the following code.

```java:line-numbers
private static final float CREEPER_HEIGHT = 1.7f;
private static final float CREEPER_SCALE = 0.5f;
private static final int SLOT_SIZE = 16;

@Override
public void render(GuiGraphics guiGraphics, EntityIngredient entityIngredient) {
    if (!(entityIngredient.getEntity() instanceof LivingEntity entity)) {
        // don't render the entity if it's null or not a living entity
        return;
    }

    var poseStack = guiGraphics.pose();
    poseStack.pushPose();
    {
        poseStack.translate(SLOT_SIZE / 2f, SLOT_SIZE, 100);
        poseStack.mulPose(Axis.ZP.rotationDegrees(180));

        var entityHeight = entity.getBbHeight();
        var entityScale = Math.min(CREEPER_HEIGHT / entityHeight, 1f) * 16;
        var scaleFactor = CREEPER_SCALE * entityScale;
        poseStack.scale(scaleFactor, scaleFactor, scaleFactor);

        Lighting.setupForEntityInInventory();
        var entityRenderer = Minecraft.getInstance().getEntityRenderDispatcher();
        entityRenderer.setRenderShadow(false);
        RenderSystem.enableBlend();

        MeasuringBufferSource measuringBufferSource = new MeasuringBufferSource();
        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, poseStack, measuringBufferSource,
            LightTexture.FULL_BRIGHT
        ));

        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(),
            LightTexture.FULL_BRIGHT
        ));
        guiGraphics.flush();

        entityRenderer.setRenderShadow(true);
        Lighting.setupFor3DItems();
    }
    poseStack.popPose();
```

In line 28 of this implementation, I create an instance of the new `MeasuringBufferSource`. I then call the render method of the entity
dispatcher with it in lines 29-32. This will not render anything but will populate the measuring buffer with vertex data. After that, I
can access the collected data via `measuringBufferSource.getData()`. The new code doesn't handle the actual scaling and offsetting just
yet. But we can already take a look at the collected data for a few entities in comparison to their bounding boxes.

<a id="measuring-results"></a>

| Entity Type         | min X   | min Y   | min Z  | max X   | max Y   | max Z   |
| ------------------- | ------- | ------- | ------ | ------- | ------- | ------- |
| bat bbox            | -0.25   | 0.0     | -0.25  | 0.25    | 0.9     | 0.25    |
| bat mesh            | 283.406 | 281.186 | 99.937 | 284.593 | 281.999 | 100.062 |
| blaze bbox          | -0.3    | 0.0     | -0.3   | 0.3     | 1.8     | 0.3     |
| blaze mesh          | 347.377 | 280.249 | 99.582 | 348.455 | 281.746 | 100.561 |
| cat bbox            | -0.3    | 0.0     | -0.3   | 0.3     | 0.7     | 0.3     |
| cat mesh            | 343.873 | 175.399 | 98.906 | 344.127 | 176.004 | 100.651 |
| cow bbox            | -0.45   | 0.0     | -0.45  | 0.45    | 1.4     | 0.45    |
| cow mesh            | 279.625 | 174.436 | 99.375 | 280.375 | 175.999 | 100.875 |
| creeper bbox        | -0.3    | 0.0     | -0.3   | 0.3     | 1.7     | 0.3     |
| creeper mesh        | 299.739 | 280.374 | 99.625 | 300.261 | 281.999 | 100.375 |
| elder_guardian bbox | -0.998  | 0.0     | -0.998 | 0.998   | 1.997   | 0.998   |
| elder_guardian mesh | 278.739 | 237.647 | 95.511 | 281.244 | 239.997 | 101.244 |
| ender_dragon bbox   | -8.0    | 0.0     | -8.0   | 8.0     | 8.0     | 8.0     |
| ender_dragon mesh   | 309.730 | 278.217 | 93.219 | 322.269 | 282.297 | 108.878 |
| fox bbox            | -0.3    | 0.0     | -0.3   | 0.3     | 0.7     | 0.3     |
| fox mesh            | 331.749 | 281.280 | 98.862 | 332.250 | 281.999 | 100.687 |
| ghast bbox          | -2.0    | 0.0     | -2.0   | 2.0     | 4.0     | 2.0     |
| ghast mesh          | 377.75  | 277.945 | 96.545 | 382.25  | 285.422 | 102.25  |
| phantom bbox        | -0.45   | 0.0     | -0.45  | 0.45    | 0.5     | 0.45    |
| phantom mesh        | 264.816 | 207.637 | 99.042 | 267.246 | 208.260 | 100.577 |
| silverfish bbox     | -0.2    | 0.0     | -0.2   | 0.2     | 0.3     | 0.2     |
| wither bbox         | -0.45   | 0.0     | -0.45  | 0.45    | 3.5     | 0.45    |
| wither mesh         | 310.5   | 158.498 | 99.242 | 313.5   | 161.735 | 100.528 |
| zombie bbox         | -0.3    | 0.0     | -0.3   | 0.3     | 1.95    | 0.3     |
| zombie mesh         | 363.481 | 279.777 | 99.718 | 364.517 | 281.999 | 101.216 |

Looking at this data, we can already see some interesting things. The min and max values represent the axis-aligned bounding box of the
actual model geometry. By subtracting the min values from the max values, we can determine the actual size of the entity. If we look at
the Ghast, for example, we can see that its model extends significantly beyond its bounding box, especially in height. This confirms
our earlier observation about the Ghast's misalignment in the slot.

With that data in mind, I tried improving the scaling and offsetting logic. Since there are some entities that are wider than they are
tall, I decided to take all dimensions into account when calculating the scale factor. For that, I used the diagonal size of the measured
bounding box. The diagonal size can be calculated in the following way.

```java
float dx = maxX - minX;
float dy = maxY - minY;
float dz = maxZ - minZ;
float diagonal = (float) Math.sqrt(dx * dx + dy * dy + dz * dz);
```

Using this for the scale and the height of the measured bounding box for the offset, I ended up with the following code.

```java
// ... inside render method after measuring
MeasuringResult data = measuringBufferSource.getData();
if (data == null) return;

float dx = data.maxX() - data.minX();
float dy = data.maxY() - data.minY();
float dz = data.maxZ() - data.minZ();
float diagonal = (float) Math.sqrt(dx * dx + dy * dy + dz * dz);
poseStack.scale(diagonal, diagonal, diagonal);

float height = measuringResult.maxY() - measuringResult.minY();
poseStack.translate(0, height, 0);

RenderSystem.runAsFancy(() -> entityRenderer.render(
    entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(),
    LightTexture.FULL_BRIGHT
));
// ... rest of render logic
```

The resulting rendering looks as follows. You might be thinking "Hey, this looks like a huge step back!". And you would be right when
comparing the current state to the previous hardcoded scaling approach. However, with this implementation, we know the scale and offset
is dynamically calculated based on the actual model size. Big models became really big while smaller models are still really small. The
next step is to normalize the scale and offset to fit within the slot properly.

<img src="/../img/after-measuring.png" class="center" width="600">

### Normalization

To tackle the normalization, we need to think of a mathematical formula that maps the measured size to a target size. Because I am pretty
bad at math, I had to resort to trial and error again. After some testing, I came up with a formula that already matched my expectations
quite well.

```java
float dx = data.maxX() - data.minX();
float dy = data.maxY() - data.minY();
float dz = data.maxZ() - data.minZ();
float diagonal = (float) Math.sqrt(dx * dx + dy * dy + dz * dz);
float scale = 18f / (float) Math.pow(diagonal, 0.9);
poseStack.scale(scale, scale, scale);
```

<img src="/../img/after-scale-formula.png" class="center" width="600">

The formula uses a target size of `18f`, which acts as a global modifier. Changing this value will make all entities bigger or smaller.
Additionally, I applied an exponent of `0.9` to the diagonal size to reduce the impact of larger entities. This means that larger entities
will be scaled down more aggressively than smaller ones. This results in a more consistent appearance across different entity sizes.

The scaling looks pretty good now. Entities have a consistent size as they would appear in the game as well just shrinked to the size
of the slot. However, the offset is still not perfect. Because we shift the offset by the measured height, entities that already aligned
with the bottom of the slot will now appear too high. To fix this, we need to subtract their bounding box height from the current offset.

```java
float height = measuringResult.maxY() - measuringResult.minY();
poseStack.translate(0, height - entity.getBbHeight(), 0);
```

<img src="/../img/after-offset-formula.png" class="center" width="600">

## Animations

This is already looking pretty good. However, entities are still static and looka bit dull. To improve the visual appearance, I decided
to add their animations to the rendering as well. This is quite simple to achieve. The entity renderer already handles animations based
on the entity's age in ticks. Since we are in a client-side environment, we can access the current tick count in the player of the current
Minecraft instance and apply that to the entity before rendering it.

```java
Minecraft mc = Minecraft.getInstance();
if (mc.player != null) {
    entity.tickCount = mc.player.tickCount;
}
```

After applying this change, entities now animate as they would in the game. There are some exceptions like the Ender Dragon. The Dragon
is a really old entity and uses a custom animation system that changes state based on various factors, such as its phase or the target
it is attacking. Since we don't have any of that context in our renderer, the Dragon will just stay still. All entities using a tick-based
animation system will animate properly, though. Activating the animations of the entities brought up another issue to the already long
list of problems.

<video src="/../img/entity-jitter.mp4" class="center" width="600" controls></video>

As you can see in the video, some entities appear to jitter or shake slightly. This is especially noticeable in entities like the Blaze
or the Ghast. The reason for this is that the render method is called on every frame, which means on every refresh of your monitor. In
my case this is 144 times per second. Since the measuring logic is called within the render method and therefore on every frame as well,
every entity with alternating height vertices will appear to jitter because their total height changes slightly on each frame. To fix
this, the measured values need to be cached.

Caching is the process of storing data in a temporary storage area so that it can be accessed more quickly in the future. A cache needs
a unique key to identify each entry. In our case, the key can be the entity identifier. Since an entity with the same identifier will
always have the same model, the measured values will be the same as well. Therefore, we can use the entity identifier as the cache key.
To implement this, I decided to use a simple `Map` that maps entity identifiers to their measured results.

```java
private final Map<String, MeasuringResult> measuringCache = new HashMap<>();
// ... inside render method after setting up the renderer
MeasuringResult data = measuringCache.computeIfAbsent(
    entityId, id -> {
        MeasuringBufferSource measuringBufferSource = new MeasuringBufferSource();
        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, poseStack, measuringBufferSource,
            LightTexture.FULL_BRIGHT
        ));

        return measuringBufferSource.getData();
    }
);

float dx = data.maxX() - data.minX();
float dy = data.maxY() - data.minY();
float dz = data.maxZ() - data.minZ();
float diagonal = (float) Math.sqrt(dx * dx + dy * dy + dz * dz);
float scale = 18f / (float) Math.pow(diagonal, 0.9);
poseStack.scale(scale, scale, scale);

float height = data.maxY() - data.minY();
poseStack.translate(0, height - entity.getBbHeight(), 0);
// ... rest of render logic
```

Caching fixed the jittering issue completely. The concept of caching is a good practice for implementations like this in general and I
would have done it sooner or later anyways. In this case, it also has the added benefit of fixing one of the many rendering issues.

<video src="/../img/jitter-fix.mp4" class="center" width="600" controls></video>

## Improvements

The renderer is in a good state now. A happy end you could say, right? My OCD says No! I wanted to improve. As you could see in the
previous screenshots and videos, the entities, except for the Dragon, are aligned pretty well, now that the offset is calculated by the
entity's mesh. However, some entities still appear a bit off. Additionally, the scaling doesn't really represent a good user experience.
Small entities are still very small and hardly recognizable. A better solution would be to scale all entities to an equal size.

To achieve this, I needed to establish a proper relationship between the measured size and the target size. Right now, the measured size
has no relation to the bounding box size which is used by the dispatcher to align the entity.

Approaching this problem needs more investigation. You might have asked yourself why the values in the
[measuring results](#measuring-results) look so weird in comparison to the bounding box values. They seem to be starting in arbitrary
high numbers instead of around `0.0`. I was questioning this myself as well. Looking at these values, I realized that the number depends
on the position of the entity in the GUI. This means the vertex positions use the relative coordinates of the entity in the world. This
makes sense because the `PoseStack` I am using for measuring the entity is already transformed to the position of the slot in the GUI.

To fix this, I decided to create a new `PoseStack` for the measuring logic. If you create a new `PoseStack`, the underlying matrix is
a zero matrix. Theoretically, this should result in vertex positions starting from the origin point `0, 0, 0`. After implementing this
change, the measuring results looked as follows.

```java
MeasuringResult data = measuringCache.computeIfAbsent(
    entityId, id -> {
        MeasuringBufferSource measuringBuffer = new MeasuringBufferSource();
        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, guiGraphics.pose(), measuringBuffer, LightTexture.FULL_BRIGHT // [!code --]
            entity, 0, 0, 0, 0, 1, new PoseStack(), measuringBuffer, LightTexture.FULL_BRIGHT // [!code ++]
        ));

        return measuringBuffer.getData();
    }
);
```

| Entity Type    | min X  | min Y  | min Z  | max X | max Y | max Z |
| -------------- | ------ | ------ | ------ | ----- | ----- | ----- |
| bat            | -0.593 | 0.001  | -0.062 | 0.593 | 0.813 | 0.062 |
| blaze          | -0.554 | 0.252  | -0.669 | 0.659 | 1.751 | 0.385 |
| cat            | -0.134 | -0.004 | -1.093 | 0.131 | 0.600 | 0.654 |
| cow            | -0.375 | 0.001  | -0.625 | 0.375 | 1.563 | 0.880 |
| creeper        | -0.267 | 0.001  | -0.375 | 0.267 | 1.626 | 0.375 |
| elder_guardian | -1.182 | 0.002  | -4.485 | 1.182 | 2.352 | 1.214 |
| ender_dragon   | -6.269 | -0.297 | -6.780 | 6.269 | 3.782 | 8.878 |
| fox            | -0.283 | 9.375  | -1.137 | 0.254 | 0.719 | 0.705 |
| ghast          | -2.25  | -3.803 | -2.803 | 2.25  | 4.054 | 2.25  |
| phantom        | -1.361 | 0.075  | -1.002 | 1.299 | 0.362 | 0.577 |
| silverfish     | -0.322 | 0.001  | -0.784 | 0.322 | 0.501 | 0.288 |
| wither         | -1.5   | 0.241  | -0.699 | 1.5   | 3.502 | 0.515 |
| zombie         | -0.517 | 3.814  | -0.281 | 0.517 | 2.245 | 1.213 |

These new values confirm my assumption. The vertex positions now start around `0.0`. More importantly, all models seem to be centered
around the origin point, which can be seen by the min and max X/Z values being roughly equal in magnitude but opposite in sign. With this
new data, I am now able to build a relationship between the measured size and the bounding box size.

<img src="/../img/measure-graphical.png" class="center" width="600">

Since we already know the lower bound of the bounding box is always `0.0` on the Y-axis, and we know the entity dispatcher uses that for
alignment, we can use the max Y value of the now center-aligned measured bounding box to determine the actual height offset of the entity
model, as well as a scale that maps the measured height to the slot height.

```java
// ... inside render method after measuring
float height = data.maxY() - data.minY();
float scale = SLOT_SIZE / height;
float offsetY = data.minY() * scale;

poseStack.translate(0, -offsetY, 0);
poseStack.scale(scale, scale, scale);
// ... rest of render logic
```

<img src="/../img/relationship-calculation.png" class="center" width="600">

Now, all entities have a consistent size and are properly aligned within the slot. At least for the entity height. Since we have a few
entities that are wider than they are tall, like the Phantom, or the Dragon, we could improve the scaling further by taking the width
into account. Because entities like the Phantom will become very small again if we fit the wings between the slot borders, we use a
modifier that reduces the impact of the width on the final scale.

```java
float width = data.maxX() - data.minX();
float height = data.maxY() - data.minY();
float heightScale = SLOT_SIZE / height;
float widthScale = (SLOT_SIZE / width) * 2;
float scale = Math.min(widthScale, heightScale);
float offsetY = data.minY() * heightScale;

poseStack.translate(0, -offsetY, 0);
poseStack.scale(scale, scale, scale);
```

If you look closely, the Blaze is not perfectly aligned yet. The same problem can be seen with the Phantom. It's located inside the slot
bounds, but it appears right at the bottom. That happens because the models of those entities extend below their bounding box, but only
in a specific animation state. Since I only measure the entity once in the initial tick, and then cache the result, the measuring logic
doesn't capture the lowest point of the model during its animation cycle.

|             Blaze             |             Phantom             |
| :---------------------------: | :-----------------------------: |
| ![](/../img/offset-blaze.png) | ![](/../img/offset-phantom.png) |

To fix this, I needed to find a way to measure the entity in all its animation states. For that, I looped for 40 ticks (2 seconds) and
called the entity measuring logic on each tick with the same measuring buffer. This way, the measuring buffer captures all vertex
positions during the animation cycle and therefore the lowest point of the model as well.

```java
// ... inside cache computeIfAbsent
var entityRenderer = mc.getEntityRenderDispatcher();
var measuringBuffer = new MeasuringBufferSource();
var poseStack = new PoseStack();

for (var i = 0; i < 40; i++) {
    var ticks = i;
    RenderSystem.runAsFancy(() -> entityRenderer.render(
        entity, 0, 0, 0, 0, ticks, poseStack, measuringBuffer, LightTexture.FULL_BRIGHT
    ));
}
// ... rest of measuring logic
```

Because calling this measuring logic 40 times is quite expensive if it would happen on every render call, the caching becomes even more
important. However, since the measuring only happens once per entity type, the performance impact is negligible in the end. There is a
little edge case remaining. If an entity has an animation longer than 40 ticks, it might still not capture the lowest point of the model.
However, most entity animations are shorter than that, so this should be fine.

|                Blaze                |                Phantom                |
| :---------------------------------: | :-----------------------------------: |
| ![](/../img/offset-blaze-after.png) | ![](/../img/offset-phantom-after.png) |

## Scissor

To further improve the visual appearance, I wanted to avoid that an entity in the output slot overlaps with other slots next to it. This
can happen with wide entities like the Ender Dragon or the Phantom. To find this, I planned to use a technique called scissoring. In
OpenGL, scissoring is used to define a rectangular area of the screen where rendering is allowed. Any pixels outside this area will not
be drawn. Think of it like an invisible frame that restricts where things can be rendered.

Because I never worked with scissoring before, I had to do some research on how to implement it properly. I found a method in the
`RenderSystem` class called `enableScissor` that takes the coordinates and dimensions of the scissor rectangle as parameters. After
applying this method, I quickly realized that the coordinates need to be in the screen space rather than the GUI space. This means you
need the `x` and `y` position measured from the corner of the screen. Since this depends on your resolution and your GUI scale, it's a
real hassle to obtain these coordinates and is out of scope for this blog post. I can just say that this information is not exposed
anywhere, so I started researching again until I found another method in the `GuiGraphics` class called `enableScissor` as well.

```java
guiGraphics.enableScissor(0, 0, SLOT_SIZE, SLOT_SIZE);
// ... render entity logic
guiGraphics.disableScissor();
```

Contrary to the `RenderSystem` method, this one takes minimum and maximum positions for `x` and `y` instead of coordinates and
dimensions. Since this method is exposed by the `GuiGraphics` instance and the `GuiGraphics` host the `PoseStack` instance, I assumed
that the coordinates are in GUI space rather than screen space because the underlying matrix already holds the position of the slot.

After applying it to the render method, all my entities vanished. Because something like this isn't easy to debug, I wanted to to
visualize the positions I used by drawing some simple rectangles. The `GuiGraphics` offer a simple method for this. It also takes
minimum and maximum positions for `x` and `y`, as well as a color.

```java
guiGraphics.fill(0, 0, SLOT_SIZE, SLOT_SIZE, 0xFFFF_FFFF);
```

<img src="/../img/scissor-debug.png" class="center" width="600">

As you can see, the drawn rectangles are perfectly aligned with the slots. This means the scissoring coordinates should be correct as
well. You would assume that the position you define is in the GUI space because it's a method by `GuiGraphics` that holds the instance of
the `PoseStack` and that should use the underlying matrix, right? Wrong!

It turns out that this method also uses screen space coordinates just like the `RenderSystem` method. Why is that? I have no idea.
Function-wise they are identical. This meant that I once again needed to find the screen space coordinates of the slot. Because I had a
lot of mathematics in school and in university, I tried to remember how obtain the origin point of a matrix. Because Minecraft uses
quaternions for rotation, the underlying matrix is 4-dimensional. Something I didn't ever have to deal with in math class. Funnily enough,
I searched through available methods in the matrix of the `PoseStack` and found a method called `transformPosition` which takes a
position in 3D space and a vector. Looking at its implementation, I had no clue what it does. However, after testing it, I realized that
it somehow converts the position you pass into screen space and applies it to the vector you provide. By passing a zero vector, I was
able to retrieve the screen space position of the slot.

Some things to note are that this needed to be called before transforming the matrix in any way, because it starts at the upper left slot
corner which is the exact position I needed. Additionally, I needed to ensure to disable scissoring after the rendering is done because
this also uses a stack internally. If you don't remove your scissor entry from the stack, the game will crash later.

```java
Vector3f absolutePos = poseStack.last().pose().transformPosition(0, 0, 0, new Vector3f());
int absX = (int) absolutePos.x;
int absY = (int) absolutePos.y;
guiGraphics.enableScissor(absX, absY, absX + SLOT_SIZE, absY + SLOT_SIZE);
// ... render entity logic
guiGraphics.disableScissor();
```

<img src="/../img/scissor.png" class="center" width="600">

As you can see, for entities that extend beyond the slot boundaries, like the Ender Dragon, the overlapping parts are now properly
clipped. For the output slots, this is perfect. It looks weird on the input slots, though. This can easily be fixed by gating the
clipping logic behind a boolean flag that is set depending on whether the slot is an input or output slot.

## Rotation

Now, we are getting to the most confusing part of this whole journey.

You probably noticed that all entities are rendered facing towards the camera. But there are two cases where this is not true. The Ender
Dragon and the Bat. Both entities are rendered facing away from the camera. The Bat is a special topic. The entity it renders in a GUI
doesn't seem to match the entity that is rendered in world. I have no explanation for this as of now. The Dragon, however, is easier to
explain. Its model is in fact rotated 180 degrees on the Y-axis by default. Why is this? I have no clue. Is this what we call Mojank?

I can only imagine that this is an old leftover from when the Dragon was first implemented in Minecraft. To ensure I am not doing
anything wrong, I checked JER again. To my surprise, JER renders the Dragon correctly facing the camera. The Bat, however, is also facing
away.

|         JER Bat          |         JER Dragon          |
| :----------------------: | :-------------------------: |
| ![](/../img/jer-bat.png) | ![](/../img/jer-dragon.png) |

Looking at JER's implementation, I found that they just call the vanilla entity renderer that is used inside the `InventoryScreen` to
render the player model. Because method parameter and local variable names are obfuscated in Minecraft, I had to debug my way through
the code to see what each value does. After some trial and error, I decided to call the vanilla renderer myself and could confirm that
the Dragon is rendered correctly.

The interesting part in the vanilla implementation is that they seem to adjust rotation properties of the entity instance. The following
code displays the relevant part of the vanilla implementation. You'll notice that variable names are obfuscated and that some of the code
doesn't really make sense because variables are being assigned to themselves. This is one of the downsides of decompiled code but we can
still observe what is happening.

```java:line-numbers
float f4 = p_275689_.yBodyRot;
float f5 = p_275689_.getYRot();
float f6 = p_275689_.getXRot();
float f7 = p_275689_.yHeadRotO;
float f8 = p_275689_.yHeadRot;
p_275689_.yBodyRot = 180.0F + f2 * 20.0F;
p_275689_.setYRot(180.0F + f2 * 40.0F);
p_275689_.setXRot(-f3 * 20.0F);
p_275689_.yHeadRot = p_275689_.getYRot();
p_275689_.yHeadRotO = p_275689_.getYRot();
float f9 = p_275689_.getScale();
Vector3f vector3f = new Vector3f(0.0F, p_275689_.getBbHeight() / 2.0F + p_275604_ * f9, 0.0F);
float f10 = (float)p_294663_ / f9;
renderEntityInInventory(p_282802_, f, f1, f10, vector3f, quaternionf, quaternionf1, p_275689_);
p_275689_.yBodyRot = f4;
p_275689_.setYRot(f5);
p_275689_.setXRot(f6);
p_275689_.yHeadRotO = f7;
p_275689_.yHeadRot = f8;
```

In the lines 1-5, different rotation values of the entity are being captured. An entity has many different rotation values that control
how it is positioned in the world. The Y body rotation is the rotation of the main body of the entity. The Y rotation is the overall
rotation around the Y-axis. The Y head rotation is the rotation of the head part of the entity. There are additional properties for each
rotation that are suffixed with `0`. These properties are used to lerp between the previous and the current rotation for smooth
transitions. If you ever played Minecraft, you have probably seen that if you rotate your player, the body remains in the same position
for a bit before rotating as well. To achieve this effect, the distinction between the body rotation and the overall rotation is used.

The lines 6 and 7 show us that the body and the overall rotation are set to 180°. The remaining calculation serves the purpose of facing
the mouse cursor, which is irrelevant in our case. After that, the head rotation is set to the same values. But what does this mean? It
means that the vanilla code rotates the entity to face the opposite direction instead of the camera. This means that all entities are
facing away from the camera. When the `renderEntityInInventory` method is called, it receives the scale from the logic above.
Interestingly, this method does the following.

```java:line-numbers
guiGraphics.pose().pushPose();
guiGraphics.pose().translate((double)x, (double)y, 50.0);
guiGraphics.pose().scale(scale, scale, -scale);
guiGraphics.pose().translate(translate.x, translate.y, translate.z);
guiGraphics.pose().mulPose(pose);
```

As you can see in line 3, it scales the Z-axis negatively with the full value of the scale. This effectively mirrors the entity towards
the camera. Well, this would make sense if all entities were rotated 180° by default. However, this is not the case as we have seen with
the Dragon or the Bat. I recreated the rotation logic without applying the mirroring scale to see what's going on. After a lot of trial
and error, I realized it's really important to set all rotation properties, including the head. Otherwise, some entities will face in
the opposite way while the head still looks at the camera. For entities without a head, like the Silverfish, this doesn't matter.

```java
// ... inside render method before rendering
float width = data.maxX() - data.minX();
float height = data.maxY() - data.minY();
float heightScale = SLOT_SIZE / height;
float widthScale = (SLOT_SIZE / width) * 2;
float scale = Math.min(widthScale, heightScale);
float offsetY = data.minY() * heightScale;

entity.yRotO = 180;
entity.setYRot(180); // property is not accessible
entity.yBodyRotO = 180;
entity.yBodyRot = 180;
entity.yHeadRotO = 180;
entity.yHeadRot = 180;

poseStack.translate(0, -offsetY, 0);
poseStack.scale(scale, scale, scale);
// ... rest of render logic
```

<img src="/../img/rotated.png" class="center" width="600">

As expected, the entities are now facing away from the camera. Logically, the Bat and the Dragon should now face the camera correctly.
However, only the Bat does while the Dragon still faces away. Do I have an explanation for this? No, I don't. I just accepted the fact
and applied the negative Z scaling to see what happens next.

```java
poseStack.scale(scale, scale, scale); // [!code --]
poseStack.scale(scale, scale, -scale); // [!code ++]
```

<img src="/../img/mirrored.png" class="center" width="600">

Now, all entities are facing the camera correctly. Does this make sense? Not really. But it works. Sometimes in development, you just
have to accept that things are weird and move on. Especially if you already spent many hours on something that was to be as simple as
rendering an entity in a GUI slot.

You would think that mirroring the Z-axis would have the same effect as rotating the matrix by 180° on the Y-axis. Turns out, it doesn't.
If you rotate the matrix, the following will happen.

<img src="/../img/rotated-matrix.png" class="center" width="600">

For some reason, this causes the Bat to still be facing in the wrong direction. I have no explanation for this behavior. If you have any
idea why this is happening, feel free to reach out to me.

The last remaining issue on the topic of rotation is the Wither. As you can see, the Wither's head is correctly facing the camera, but
the two additional heads are not. After a bit of investigation, I found out that the Wither's additional head rotation is controlled in
the AI logic of the entity. This means it only updates the head rotation under certain conditions, such as when it is attacking a target.

Because I don't want to apply actual AI ticking logic to the entities in the GUI, I decided to manually set the head rotations by
checking if the entity is a Wither. This is the only case which needs special treatment so far and I hope it is the last. I personally
find the vanilla approach to this very ugly but since Minecraft itself has no other use case for rotating the heads except for the
actual in-world entity, it's the only solution they needed.

```java
if (entity instanceof WitherBoss witherBoss) {
    var yRotHeads = witherBoss.yRotHeads; // this is private and needs access widening
    var yRotOHeads = witherBoss.yRotOHeads;
    for (var i = 0; i < yRotHeads.length; i++) {
        yRotHeads[i] = HALF_ROT;
        yRotOHeads[i] = HALF_ROT;
    }
}
```

## Result

After applying all the changes mentioned above, the final renderer looks as follows. To make things a bit more readable, I extracted
the measuring logic into a separate method. The scissoring logic is now gated behind a boolean flag that is set depending on whether the
slot is an input or output slot. Constants have been extracted and the caching logic has been improved.

To display the entities in a more recognizable fashion, I also added a bit of rotation to their models. They now face a bit towards the
bottom left instead of directly facing the camera. This gives a better view on the models and makes them more appealing.

<img src="/../img/result.png" class="center" width="600">

::: details Final Renderer Code

```java
public final class EntityIngredientRenderer implements IIngredientRenderer<EntityIngredient> {

    public static final EntityIngredientRenderer BOOKMARK_RENDERER = new EntityIngredientRenderer(true, false);
    public static final EntityIngredientRenderer INPUT_RENDERER = new EntityIngredientRenderer(false, true);
    public static final EntityIngredientRenderer OUTPUT_RENDERER = new EntityIngredientRenderer(true, true);
    private static final int TEXT_COLOR = 16_777_215;
    private static final int MEASURE_TICKS = 40;
    private static final int HALF_ROT = 180;
    private static final int SLOT_SIZE = 16;

    private final Minecraft mc = Minecraft.getInstance();
    private final Map<String, MeasuringResult> measuringCache = new HashMap<>();
    private final Map<String, MeasuringResult> measuringResultCache = new HashMap<>();
    private final boolean scissor;
    private final boolean renderCount;

    private EntityIngredientRenderer(boolean scissor, boolean renderCount) {
        this.scissor = scissor;
        this.renderCount = renderCount;
    }

    @Override
    public void render(GuiGraphics guiGraphics, EntityIngredient entityIngredient) {
        if (mc.level == null || mc.player == null || !(entityIngredient.getEntity() instanceof LivingEntity entity)) {
            return;
        }

        var entityId = entityIngredient.getResourceLocation().toString();
        var measuringResult = measureEntity(entity, entityId);
        if (measuringResult == MeasuringResult.EMPTY) return;

        var poseStack = guiGraphics.pose();
        poseStack.pushPose();
        {
            renderEntity(guiGraphics, poseStack, entity, measuringResult);
        }
        poseStack.popPose();
        if (!renderCount) return;
        poseStack.pushPose();
        {
            renderCount(guiGraphics, entityIngredient, poseStack);
        }
        poseStack.popPose();
    }

    @SuppressWarnings("deprecation")
    private MeasuringResult measureEntity(LivingEntity entity, String entityId) {
        var cached = measuringResultCache.get(entityId);
        if (cached != null) return cached;

        var entityRenderer = mc.getEntityRenderDispatcher();
        var measuringBuffer = new MeasuringBufferSource();
        var poseStack = new PoseStack();

        for (var i = 0; i < MEASURE_TICKS; i++) {
            var ticks = i;
            RenderSystem.runAsFancy(() -> entityRenderer.render(
                entity, 0, 0, 0, 0, ticks, poseStack, measuringBuffer, LightTexture.FULL_BRIGHT
            ));
        }

        var measuringResult = measuringBuffer.getData();
        if (measuringResult == null) {
            SummoningRituals.LOGGER.error("failed to measure entity: {}", entityId);
            return MeasuringResult.EMPTY;
        }
        measuringResultCache.put(entityId, measuringResult);
        return measuringResult;
    }

    private void renderEntity(
        GuiGraphics guiGraphics, PoseStack poseStack, LivingEntity entity, MeasuringResult measuringResult
    ) {
        if (scissor) {
            var absolutePos = poseStack.last().pose().transformPosition(0, 0, 0, new Vector3f());
            var absX = (int) absolutePos.x;
            var absY = (int) absolutePos.y;
            guiGraphics.enableScissor(absX, absY, absX + SLOT_SIZE, absY + SLOT_SIZE);
        }

        poseStack.translate(SLOT_SIZE / 2f, SLOT_SIZE, 100);
        poseStack.mulPose(Axis.ZP.rotationDegrees(HALF_ROT));

        Lighting.setupForEntityInInventory();
        var entityRenderer = mc.getEntityRenderDispatcher();
        entityRenderer.setRenderShadow(false);
        RenderSystem.enableBlend();

        entity.absRotateTo(HALF_ROT, 0);
        entity.yBodyRotO = HALF_ROT;
        entity.yBodyRot = HALF_ROT;
        entity.yHeadRotO = HALF_ROT;
        entity.yHeadRot = HALF_ROT;
        if (entity instanceof WitherBoss witherBoss) {
            var yRotHeads = witherBoss.yRotHeads;
            var yRotOHeads = witherBoss.yRotOHeads;
            for (var i = 0; i < yRotHeads.length; i++) {
                yRotHeads[i] = HALF_ROT;
                yRotOHeads[i] = HALF_ROT;
            }
        }

        var width = measuringResult.maxX() - measuringResult.minX();
        var height = measuringResult.maxY() - measuringResult.minY();

        var heightScale = SLOT_SIZE / height;
        var widthScale = (SLOT_SIZE / width) * 2;
        var scale = Math.min(widthScale, heightScale);

        poseStack.translate(0, -measuringResult.minY() * heightScale, 0);
        poseStack.mulPose(Axis.YP.rotationDegrees(20));
        poseStack.mulPose(Axis.XP.rotationDegrees(5));
        poseStack.scale(scale, scale, -scale);

        RenderSystem.runAsFancy(() -> entityRenderer.render(
            entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(),
            LightTexture.FULL_BRIGHT
        ));
        guiGraphics.flush();

        entityRenderer.setRenderShadow(true);
        Lighting.setupFor3DItems();
        if (scissor) guiGraphics.disableScissor();
    }

    private void renderCount(GuiGraphics guiGraphics, EntityIngredient entityIngredient, PoseStack poseStack) {
        var count = entityIngredient.getEntityInfo().count();
        if (count <= 1) return;
        poseStack.translate(10, 9, 200);
        guiGraphics.drawString(mc.font, String.valueOf(count), 0, 0, TEXT_COLOR, true);
    }
}
```

:::

## Conclusion

Rendering entities in a GUI is a complex task that requires careful consideration of various factors, including entity size, offsets,
and vanilla rendering quirks. There are many things I still don't fully understand, but I'm happy with the current state of the entity
renderer in SR's JEI integration.

Who would have though that a simple pitch of an idea would lead to such a deep dive into a system like this? I certainly didn't expect
to spend so much time on this. However, I learned a lot about Minecraft's rendering system and how to work with entities in a GUI
context. I hope this blog post has provided some insights into the challenges and solutions involved in rendering entities in a GUI.

Special thanks again to [embeddedt] for giving me this awesome idea. Another huge shoutouts to the team behind NeoForge as well as
ModDevGradle. The mod loader and the Gradle toolchain are awesome tools that make mod development so much easier. Shoutouts to the
JetBrains team as well for maintaining a Java runtime that supports DCEVM which makes hot swapping way better.

Lastly, I want to thank you for reading this far. If you have any questions or suggestions, feel free to reach out.

<!-- Links -->

[discord]: https://discord.com/invite/ThFnwZCyYY
[ar-github]: https://github.com/AlmostReliable/
[author-github]: https://github.com/rlnt
[sr-github]: https://github.com/AlmostReliable/summoningrituals
[kubejs]: https://github.com/KubeJS-Mods/KubeJS
[jei]: https://github.com/mezz/JustEnoughItems
[obfuscation-article]: https://www.minecraft.net/en-us/article/removing-obfuscation-in-java-edition
[wikipedia-quaternion]: https://en.wikipedia.org/wiki/Quaternion
[jer-github]: https://github.com/way2muchnoise/JustEnoughResources
[embeddedt]: https://github.com/embeddedt
